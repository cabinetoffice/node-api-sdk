.PHONY: clean build security-check lint

NODE_VERSION_SUPPORTED := >=20.8.0
NODE_VERSION=$(shell node -v)

clean:
	rm -rf ./dist ./coverage

build:
	$(info Node version supported: $(NODE_VERSION_SUPPORTED))
	$(info Node version installed: $(NODE_VERSION))
	npm ci --silent
	npm run build

security-check:
	npm audit

lint:
	npm run lint