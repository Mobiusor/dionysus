<script>
import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'MWizard',
  props: {
    steps: {
      type: Array,
      required: true
    },
    activeKey: {
      type: String,
      required: false,
      default: null
    }
  },
  data () {
    return {
      eventBus: new Vue()
    }
  },
  computed: {
    activeIndex () {
      const activeIndex = _.findIndex(this.$props.steps, step => step.key === this.activeKey)
      return activeIndex
    }
  },
  methods: {
    handleNextStep (result) {
      const lastActiveKey = this.activeKey
      let activeKey = this.activeKey
      let activeIndex = this.activeIndex
      if (result === true) {
        if (this.activeIndex < this.$props.steps.length - 1) {
          activeIndex = this.activeIndex + 1
          activeKey = this.$props.steps[activeIndex].key
        }
      }
      this.$emit('nextStep', { lastActiveKey, activeKey, activeIndex, result })
    },
    handleLastStep (result) {
      const lastActiveKey = this.activeKey
      let activeKey = this.activeKey
      let activeIndex = this.activeIndex
      if (this.activeIndex > 0) {
        activeIndex = this.activeIndex - 1
        activeKey = this.$props.steps[activeIndex].key
      }
      this.$emit('lastStep', { lastActiveKey, activeKey, activeIndex, result })
    },
    handleTryNextStep () {
      console.log('try next step')
      this.eventBus.$emit(`${this.activeKey}-tryNextStep`)
    },
    handleTryLastStep () {
      console.log('try last step')
      this.eventBus.$emit(`${this.activeKey}-tryLastStep`)
    }
  },
  render () {
    const { steps } = this.$props
    const lastIndex = steps.length - 1

    const header = _.map(steps, (step, index) => {
      return (
        <div class={{ 'm-step-item': true, 'm-active': this.activeKey === step.key }} key={step.key}>{index + 1}.{step.title}</div>
      )
    })

    const lastButton = this.activeIndex === 0 ? null : <a-button style="margin-right:10px" onClick={this.handleTryLastStep}>上一步</a-button>
    const nextButtonText = this.activeIndex !== lastIndex ? '下一步' : '激活'
    const nextButton = <a-button type="primary" onClick={this.handleTryNextStep}>{nextButtonText}</a-button>

    const activeStep = {
      ...steps[this.activeIndex],
      props: {
        ...steps[this.activeIndex].props,
        eventBus: this.eventBus
      },
      on: {
        ...steps[this.activeIndex].on,
        nextStep: this.handleNextStep,
        lastStep: this.handleLastStep
      }
    }
    const { customRender } = activeStep
    return (
      <div class="m-body">
        <div class="m-header">
          {header}
        </div>
        <div class="m-content">
          {customRender(activeStep)}
        </div>
        <div class="m-footer">
          {lastButton}
          {nextButton}
        </div>
      </div>
    )
  },
  watch: {
  },
  created () {
    // console.log(this)
  },
  beforeDestroy () {
    this.eventBus.$off()
  }
}
</script>

<style lang="less" scoped>
@import '../themes.less';
.m-body {
  overflow: hidden;
  .m-header {
    height: 100%;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    .m-step-item {
      height: 100%;
      width: 100%;
      margin-right: 10px;
      padding: 10px;
      border: 2px solid @primary-color;
      border-radius: 8px;
      &.m-active {
        background: @primary-color;
      }
    }
  }
  .m-content {
    margin-top: 20px;
    margin-bottom: 10px;
    // height: 300px;
    // overflow-y: auto;
  }
}
</style>
