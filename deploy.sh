#!/bin/bash

# test everything:
type s3cmd >/dev/null 2>&1 || { echo >&2 "s3cmd is not installed. Aborting."; exit 1; }

# Start here:
rm -rf /tmp/gariany.com

# clone repository 
echo "cloning repository to /tmp/gariany.com"
git clone https://github.com/eladg/gariany.com.git /tmp/gariany.com
echo ""

# remove files that should not be on 
echo "removing unnecessary web files"
rm -rf /tmp/gariany.com/.git
rm -rf /tmp/gariany.com/deploy.sh
echo "done."
echo "" 

echo "uploading to S3"
s3cmd sync /tmp/gariany.com/ s3://gariany.com/
echo "done."
echo ""

echo "finish deploy. check http://gariany.com"
exit 0;

