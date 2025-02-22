# Certificates and Keys

## Creating a new certificate

1. Create new certificate in AWS console: AWS IoT &rarr; Security &rarr; Certificates &rarr; Add certificate &rarr; Create certificate
2. Download the private key and rename it to `private.pem.key`
3. Download the certificate and rename it to `certificate.pem.crt`
4. Copy the ID of the created certificate and add it in  the `cdk.json` under `context.general.certificateId`

Creating the certificate and downloading the keys are the only manual step in setting up the backend. The certificate will automatically be attached to the things in AWS IoT Core and will get a policy assigned.