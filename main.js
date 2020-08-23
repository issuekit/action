'use strict'
const actionsCore = require('@actions/core')
const actionsGithub = require('@actions/github')
const octokitCore = require('@octokit/core')
const token = actionsCore.getInput('token')
const full_repo = process.env.GITHUB_REPOSITORY
const repo = full_repo.split('/')
const comment = actionsCore.getInput('comment')
const octokit = new octokitCore({ auth: token })
const payload = actionsGithub.context.payload
const issue_number = actionsCore.getInput('issue') ? actionsCore.getInput('issue') : payload.issue.number.toString()
await octokit.request(`POST /repos/${full_repo}/issues/${issue_number}/comments`, {
  owner: repo[0],
  repo: repo[2],
  issue_number: parseInt(issue_number),
  body: comment
})
