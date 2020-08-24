'use strict'
const core = require('@actions/core')
const github = require('@actions/github')
const { request } = require('@octokit/request')
const token = core.getInput('token')
const fullRepo = process.env.GITHUB_REPOSITORY
const repo = fullRepo.split('/')
const payload = github.context.payload
const comment = core.getInput('comment')
const assign = core.getInput('assign')
const label = core.getInput('label').split(',')
const issue = parseInt(core.getInput('issueOverridesWebhook')
  ? (core.getInput('issue') ? core.getInput('issue') : payload.issue.number)
  : (payload.issue.number ? payload.issue.number : core.getInput('issue')))

if (comment) {
  request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
    headers: {
      authorization: 'token ' + token
    },
    owner: repo[0],
    repo: repo[1],
    issue_number: issue,
    body: comment
  })
}
if (assign) {
  request('POST /repos/:owner/:repo/issues/:issue_number/assignees', {
    headers: {
      authorization: 'token ' + token
    },
    owner: repo[0],
    repo: repo[1],
    issue_number: issue,
    assignees: assign
  })
}
if (label) {
  request('POST /repos/:owner/:repo/issues/:issue_number/labels', {
    headers: {
      authorization: 'token ' + token
    },
    owner: repo[0],
    repo: repo[1],
    issue_number: issue,
    labels: label
  })
}
