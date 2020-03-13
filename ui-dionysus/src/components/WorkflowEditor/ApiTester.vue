<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="appKey" :labelCol="{ span: 4 }" :wrapperCol="{ span: 19 }">
        <a-input
          v-decorator="['appKey',{
            rules: [{ required: true, message: 'Please input your appKey' }]
          }]"/>
      </a-form-item >
      <a-form-item label="appSecret" :labelCol="{ span: 4 }" :wrapperCol="{ span: 19 }">
        <a-input
          v-decorator="['appSecret',{
            rules: [{ required: true, message: 'Please input your appSecret' }]
          }]"/>
      </a-form-item>
      <a-form-item label="file" :labelCol="{ span: 4 }" :wrapperCol="{ span: 19 }">
        <a-upload-dragger
          accept=".txt, .png, .jpg, .pdf, .docx"
          :fileList="fileList"
          :beforeUpload="beforeUpload"
          :remove="handleRemove"
        >
          <div v-if="!loading">
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox"/>
            </p>
            <p class="ant-upload-text">点击或拖拽到此区域选择测试文件</p>
            <p class="ant-upload-hint">支持txt, png, jpg, pdf, docx</p>
          </div>
        </a-upload-dragger>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
        <a-button type="primary" html-type="submit" :disabled="fileList.length===0" :loading="loading">测试</a-button>
      </a-form-item>
    </a-form>
    <a-textarea v-if="result" v-model="result" :autosize="{ minRows: 20, maxRows:35 }" />
  </div>
</template>

<script>
import config from '@/config/api.config'
import axios from 'axios'

export default {
  name: 'ApiTester',
  props: {
    workflow: { type: String, default: null }
  },
  data () {
    return {
      loading: false,
      fileList: [],
      result: null
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    beforeUpload (file) {
      this.fileList = [file]
      return false
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    async handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            this.result = null
            this.loading = true
            const formData = new FormData()
            formData.append('file', this.fileList[0])
            const option = {
              method: 'POST',
              url: config.expert + `/api/workflows/${this.workflow}`,
              params: {
                appKey: values.appKey,
                appSecret: values.appSecret
              },
              data: formData
            }
            const response = await axios(option)
            this.handleResponse(response)
          } catch {
            this.$message.error('测试失败')
          } finally {
            this.loading = false
          }
        }
      })
    },
    handleResponse (response) {
      if (response.headers['content-type'] === 'application/octet-stream') {
      // const filename = response.headers['content-disposition'].split('=')[1]
        const fileContent = JSON.stringify(response.data)
        const file = new Blob([fileContent])
        const url = window.URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = 'result'
        document.body.appendChild(link)
        link.click()
        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(link.href)
        })
      } else {
        this.result = JSON.stringify(response.data)
      }
    }
  }
}
</script>
