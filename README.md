# json-to-md

This action converts a JSON returned from symfony security checker to a markdown string. This action is intended to be used with [symfonycorp/security-checker-action](https://github.com/marketplace/actions/sensiolabs-security-checker-action) and [peter-evans/create-issue-from-file](https://github.com/marketplace/actions/create-issue-from-file).

## Input

### `data`

**Required** Stringified JSON data

## Output

### `md-data`

Final result parsed in markdown

## Example

```yml
name: Composer Security Audit

on:
    pull:
    
jobs:
    build:
        runs-on: ubuntu-18.04

        steps:
            - uses: actions/checkout@v2

            - uses: symfonycorp/security-checker-action@v2
              id: security-check

            - name: Parse JSON to MD
              uses: bluetel/json-to-md@v1
              id: json-to-md
              with:
                  data: ${{ steps.security-check.outputs.vulns }}

            - name: Save markdown to file
              shell: bash
              run: |
                echo "${{ steps.json-to-md.outputs.md-data }}" >> SECURITY.md

            - name: Create issue
              id: create-issue
              uses: peter-evans/create-issue-from-file@v2
              with:
                  title: "Security vulnerabilities found"
                  content-filepath: SECURITY.md
```

## Contribute

Fork this repository, make changes in your local dev environment, push to your remote and open a pull request pointing to this repository's `master` branch.
