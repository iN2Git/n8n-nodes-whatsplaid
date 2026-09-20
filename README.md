# n8n-nodes-whatsplaid

This is an n8n community node. It lets you use the Whatsplaid API in n8n workflows.

Whatsplaid is a WhatsApp conversation platform for customer service, qualification, and sales automation.
The node respects the capabilities available in each account instead of assuming that every operation is enabled.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Account

- Get Capabilities
- Get Modules
- Get Store
- Inspect Data Source

### AI Agent

- Get or update the editable company prompt
- Get or change the AI agent state for a conversation

### Contacts

- Create or update a contact
- Get or list contacts
- Add or remove tags
- Update custom fields

### Conversations and Messages

- List conversations initiated by contacts
- List conversation messages
- Send a text reply while the WhatsApp service window is open

### Human Handoff and Tickets

- Request human handoff
- List and inspect human-service tickets
- Close a ticket

### Products and Orders

- Search or retrieve products through the configured data source
- Search or retrieve orders through the configured data source

## Credentials

Create a Whatsplaid API credential and enter the access token issued for your company. The token is sent
as a Bearer token and is stored by n8n as a password field.

The credential test calls `GET /v1/capabilities`. A successful test confirms both authentication and access
to the public API.

## Compatibility

This package is built with the official `n8n-node` tool and targets the current n8n node API version 1.
Version `0.2.0` was built and tested against `n8n-workflow` 2.39.3.

## Usage

Start with **Account > Get Capabilities**. Its response reports whether contacts, replies, conversations,
handoff, products, orders, and other resources are available for the connected company. A workflow should
check these capabilities rather than infer access from the presence of the node.

Whatsplaid can only send a message as a reply to a conversation already initiated by the contact and while
the applicable WhatsApp service window is open. The node will not provide proactive messaging operations.

The Product and Order resources call the Whatsplaid public API. Whatsplaid then queries the external
product and order REST API configured for the connected account; the n8n node doesn't call that external
data source directly and doesn't require its credentials.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Whatsplaid](https://whatsplaid.com)

## Version history

- `0.2.0`: Coverage of all actionable resources in Whatsplaid API 1.5.0.
- `0.1.0`: Initial development version with credentials, capability discovery, and store information.
