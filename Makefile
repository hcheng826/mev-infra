build:
	rm -rf dist/*
	npx tsc
	cp ./package*.json dist/

copy-to-repo: build
	echo $(repo)
	cp dist/* ../$(repo)/node_modules/mev-infra/
