'use strict'
const core = require('@actions/core')
const github = require('@actions/github')
const { request } = require('@octokit/request')
const token = core.getInput('token')
const full_repo = process.env.GITHUB_REPOSITORY
const repo = full_repo.split('/')
const comment = core.getInput('comment')
const payload = github.context.payload
const label = core.getInput('label').split(',')
const issue_number = core.getInput('issue') ? core.getInput('issue') : payload.issue.number.toString()
console.log(6)
if (comment) {
  // async () => {
  //   await octokit.request(`POST /repos/${full_repo}/issues/${issue_number}/comments`, {
  //     owner: repo[0],
  //     repo: repo[1],
  //     issue_number: parseInt(issue_number),
  //     body: comment
  //   }).catch(err)
  // }
}
// if (label) {
  request('POST /repos/:owner/:repo/issues/:issue_number/labels', {
    headers: {
      authorization: 'token ' + token,
    },
    owner: repo[0],
    repo: repo[1],
    issue_number: parseInt(issue_number),
    labels: label
  })
// }