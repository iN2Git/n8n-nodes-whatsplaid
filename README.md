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

This package is built with the official `n8n-node` tool and validated through GitHub Actions with Node.js 24.

## Usage

Start with **Account > Get Capabilities**. Its response reports whether contacts, replies, conversations,
handoff, products, orders, and other resources are available for the connected company. A workflow should
check these capabilities rather than infer access from the presence of the node.

Whatsplaid can only send a message as a reply to a conversation already initiated by the contact and while
the applicable WhatsApp service window is open. The node will not provide proactive messaging operations.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Whatsplaid](https://whatsplaid.com)

## Version history

- `0.2.4`: Correct n8n codex identifier and npm provenance publication.
- `0.2.3`: Codex identifier correction superseded by 0.2.4.
- `0.2.2`: Public support email for Creator Portal verification.
- `0.2.1`: GitHub Actions trusted publishing with npm provenance.
- `0.2.0`: Coverage of all actionable resources in Whatsplaid API 1.5.0.
- `0.1.0`: Initial development version with credentials, capability discovery, and store information.
