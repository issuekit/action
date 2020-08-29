'use strict'
const core = require('@actions/core')
const issuekit = require('issuekit')
const token = core.getInput('token')
const repo = process.env.GITHUB_REPOSITORY
const payload = require('@actions/github').context.payload
const comment = core.getInput('comment')
const assign = core.getInput('assign')
const label = core.getInput('label').split(',')
const issue = parseInt(core.getInput('issueOverridesWebhook')
  ? (core.getInput('issue') ? core.getInput('issue') : payload.issue.number)
  : (payload.issue.number ? payload.issue.number : core.getInput('issue')))

if (comment) {
  issuekit.comment.add({
    token: token,
    issue: issue,
    repo: repo,
    body: comment
  })
}
if (assign) {
  issuekit.assignees.add({
    token: token,
    issue: issue,
    repo: repo,
    assignees: assign
  })
}
if (label) {
  issuekit.labels.add({
    token: token,
    issue: issue,
    repo: repo,
    labels: label
  })
}
