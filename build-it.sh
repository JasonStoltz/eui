# Every time you update Kibana with a new build-pack, you need to use something in the name
# to bust the cache. passing a position argument here will append one for you.
#
# ex. ./build-it.sh 5
#
# That builds this artifacts like this: 5elastic-eui-theme-common-0.0.9.tgz

cacheBust=$1

cd packages/eui
yarn build:workspaces
echo `pwd`
  
cd ../eui-theme-borealis
yarn build-pack
package1=$(ls -t | head -n1)
# Because to commit this to Kibana for a POC you need to use snakecase
package1new="${cacheBust}${package1//-/_}"
mv "${package1}" ../../../kibana/${package1new}

cd ../eui-theme-common
yarn build-pack
package2=$(ls -t | head -n1)
# Because to commit this to Kibana for a POC you need to use snakecase
package2new="${cacheBust}${package2//-/_}"
mv "${package2}" ../../../kibana/${package2new}

cd ../eui
yarn build-pack
package3=$(ls -t | head -n1)
# Because to commit this to Kibana for a POC you need to use snakecase
package3new="${cacheBust}${package3//-/_}"
mv "${package3}" ../../../kibana/${package3new}

wait
echo "Update package.json in Kibana with the following:
\"@elastic/eui\": \"file:./${package3new}\",
\"@elastic/eui-theme-borealis\": \"file:./${package1new}\",
\"@elastic/eui-theme-common\": \"file:./${package2new}\",
"

