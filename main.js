'use strict'
const core = require('@actions/core')
const payloadIssue = require('@actions/github').context.payload.issue.number
const inputIssue = core.getInput('issue')
const { Issuekit } = require('@issuekit/core')
const issuekit = new Issuekit({
  auth: core.getInput('token'),
  repo: process.env.GITHUB_REPOSITORY,
  issue: parseInt(
    core.getInput('issueOverridesWebhook')
      ? inputIssue || payloadIssue
      : payloadIssue || inputIssue
  )
})
const comment = core.getInput('comment')
const assign = core.getInput('assign').split(',')
const label = core.getInput('label').split(',')
if (comment) {
  issuekit.addComment(comment)
  console.log('comment ' + comment + '\ntypeof comment' + typeof comment)
}
if (assign) {
  issuekit.addAssignees(assign)
  console.log('assign ' + assign + '\ntypeof assign' + typeof assign)
}
if (label) {
  issuekit.addLabels(label)
  console.log('label ' + label + '\ntypeof label' + typeof label)
}
