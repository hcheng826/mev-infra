build:
	rm -rf dist/*
# npx tsc
	cp src/* dist/
	cp ./package*.json dist/

copy-to-repo: build
	echo $(repo)
	cp dist/* ../$(repo)/node_modules/@hcheng826/mev-infra/
