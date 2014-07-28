OpenShift - Hello World
=======================
A simple Hello World app aimed at demoing basic deployment in OpenShift.

Pre-requisites
-------------
* You already have Git installed
* You have an existing NodeJS project or have cloned this repo to provide one

Setup
-----

1. Signup with (OpenShift](https://openshift.redhat.com)
2. Create an app either via the OpenShift [web interface](https://openshift.redhat.com/app/console/application_types)
3. [Search for nodejs](https://openshift.redhat.com/app/console/application_types?search=nodejs) and select the latest version of NodeJS (at the time of writing this was 0.10
4. Enter a suitable domain name + suffix. All other options (including Git Repo) can be left at defaults
5. Hit the 'create application button'
6. Jump to the [applications console](https://openshift.redhat.com/app/console/applications) and select your app
7. Copy the SSH address under the 'Source code' heading on the right hand side of the page
8. In your application run the command `git remote add os <SSH-ADDRESS>`
9. Push your app to OpenShift by running `git push os master`

Debugging
---------
Install the [rhc command line client](https://www.openshift.com/developers/rhc-client-tools-install).

Assuming your app is called `fooapp`:

* Restart the server with `rhc app restart fooapp`
* Get the console log via `rhc tail fooapp`

Common GOTCHAs
--------------
OpenShift can host your application on any potential IP or Port and routes so that your app appears at `http://foo-bar.rhcloud.com`.

Because of this your application needs to read the `OPENSHIFT_NODEJS_IP` and `OPENSHIFT_NODEJS_PORT` environment variables at book and listen on those.

For most node Applications this means the following code needs inserting to replace your `app.listen()` invocation:

	var host = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
	var port = Number(process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
	app.listen(port, host, function() {
		console.log("Listening at " + host + ':' + port);
	});
