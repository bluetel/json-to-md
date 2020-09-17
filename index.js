const core = require('@actions/core')
const github = require('@actions/github')

try {
	// Load JSON data
	const pathJSON = core.getInput('json-path')
	const data = require(pathJSON)

	// Start building markdown
	let md = '# Composer Security Vulnerability Detected\n'
	md = md.concat('New vulnerabilities have been found in composer.lock.\n')

	Object.entries(data).forEach(([key, value]) => {
		md = md.concat('## ', key, '\n')
		md = md.concat('**Version:** ', value.version, '\n\n')
		md = md.concat('**Advisories:**\n\n')

		Object.entries(value.advisories).forEach(([k, v]) => {
			md = md.concat(v.title, '\n\n')
			md = md.concat(v.link, '\n\n')
			md = md.concat(v.cve, '\n\n')
			md = md.concat('\n--------------------------------------------------------------\n')
		})
	})

	core.setOutput('md-data', md)

	// Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)

} catch (error) {
	core.setFailed(error.message)
}