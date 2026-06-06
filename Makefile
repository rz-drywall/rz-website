# RZ Drywall website — common tasks
# Usage: `make dev` to run the local dev server.

.DEFAULT_GOAL := help
.PHONY: help install dev build start lint format clean

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[1m%-10s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Run the dev server at http://localhost:3002
	npm run dev

build: ## Create a production build
	npm run build

start: ## Serve the production build (run `make build` first)
	npm run start

lint: ## Run ESLint
	npm run lint

format: ## Format with Prettier
	npm run format

clean: ## Remove build output and caches
	rm -rf .next node_modules/.cache
