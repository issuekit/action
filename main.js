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
const label = actionsCore.getInput('label')
const issue_number = actionsCore.getInput('issue') ? actionsCore.getInput('issue') : payload.issue.number.toString()
if (!issue_number) {
  console.log(typeof issue_number)
  actionsCore.setFailed("I cannot seem to find an issue number to comment on. If you think this is a bug, report an issue at https://github.com/issuekit/action/issues");
}
if (comment) {
  octokit.request(`POST /repos/${full_repo}/issues/${issue_number}/comments`, {
    owner: repo[0],
    repo: repo[2],
    issue_number: parseInt(issue_number),
    body: comment
  })
}
if (label) {
  console.log(typeof label)
  // octokit.request(`POST /repos/${full_repo}/issues/${issue_number}/comments`, {
  //   owner: repo[0],
  //   repo: repo[2],
  //   issue_number: parseInt(issue_number),
  //   body: comment
  // })
}