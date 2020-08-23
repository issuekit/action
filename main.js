'use strict'
const actionsCore = require('@actions/core')
const actionsGithub = require('@actions/github')
const { Octokit } = require('@octokit/core')
const token = actionsCore.getInput('token')
const full_repo = process.env.GITHUB_REPOSITORY
const repo = full_repo.split('/')
const comment = actionsCore.getInput('comment')
const octokit = new Octokit({ auth: token })
const payload = actionsGithub.context.payload
const label = actionsCore.getInput('label').split(',')
const issue_number = actionsCore.getInput('issue') ? actionsCore.getInput('issue') : payload.issue.number.toString()
if (comment) {
  octokit.request(`POST /repos/${full_repo}/issues/${issue_number}/comments`, {
    owner: repo[0],
    repo: repo[1],
    issue_number: parseInt(issue_number),
    body: comment
  })
}
// if (label) {
//   octokit.request(`POST /repos/${full_repo}/issues/${issue_number}/labels`, {
//     owner: repo[0],
//     repo: repo[1],
//     issue_number: parseInt(issue_number),
//     labels: label
//   })
// }