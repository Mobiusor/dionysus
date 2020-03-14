'use strict';
const uuidv1 = require('uuid/v1');
const workspaceIds = [ uuidv1(), uuidv1(), uuidv1(), uuidv1() ];
const groupIds = [ uuidv1(), uuidv1(), uuidv1(), uuidv1() ];
const fileIds = [ uuidv1(), uuidv1(), uuidv1() ];
const groupMemberIds = [ uuidv1(), uuidv1(), uuidv1(), uuidv1() ];
const apiApplicationIds = [ uuidv1() ];
const appSecretIds = [ uuidv1() ];

const mockData = {
  workspaceIds,
  groupIds,
  fileIds,
  groupMemberIds,
  apiApplicationIds,
  appSecretIds,
};

module.exports = mockData;
