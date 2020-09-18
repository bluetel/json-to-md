build:
	npm install
	npm i @vercel/ncc

compile:
	ncc build index.js --license licenses.txt