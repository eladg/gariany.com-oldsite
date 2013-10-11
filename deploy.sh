#!/bin/bash

# test everything:
type s3cmd >/dev/null 2>&1 || { echo >&2 "s3cmd is not installed. Aborting."; exit 1; }

echo "cloning repository to /tmp/gariany.com"
rm -rf /tmp/gariany.com
#git clone git@github.com:eladg/gariany.com.git /tmp/gariany.com
git clone /Users/eladgariany/Documents/gariany.com/.git /tmp/gariany.com
rm -rf /tmp/gariany.com/.git
echo ""

echo "uploading to S3"
s3cmd sync /tmp/gariany.com/ s3://gariany.com/
echo "done."
echo ""

echo "finish deply. check http://gariany.com"
exit 0;

