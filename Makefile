SHELL := /bin/bash

deploy: make_static_folder get_github_pages generate_new_gh_pages push_release clean

local: make_static_folder generate_local_site run_local

check_version:
	scripts/check_version.sh

make_static_folder:
	rm -rf static_site
	mkdir static_site

get_github_pages:
	scripts/get_gh_pages.sh

generate_local_site:
	scripts/generate.sh -l

generate_new_gh_pages:
	scripts/generate.sh

push_release:
	scripts/push_release.sh 

clean:
	rm -rf static_site

run_local:
	scripts/run_local.sh
