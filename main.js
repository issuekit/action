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
}
if (assign[0]) {
  issuekit.addAssignees(assign)
}
if (label[0]) {
  issuekit.addLabels(label)
}
