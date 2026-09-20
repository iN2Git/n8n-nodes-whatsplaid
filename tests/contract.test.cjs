const assert = require('node:assert/strict');
const test = require('node:test');

const { Whatsplaid } = require('../dist/nodes/Whatsplaid/Whatsplaid.node.js');
const {
	WhatsplaidApi,
} = require('../dist/credentials/WhatsplaidApi.credentials.js');

function operationsByResource(description) {
	const resources = description.properties.find((property) => property.name === 'resource').options;
	return Object.fromEntries(
		resources.map(({ value: resource }) => {
			const operationProperty = description.properties.find(
				(property) =>
					property.name === 'operation' && property.displayOptions?.show?.resource?.includes(resource),
			);
			return [
				resource,
				Object.fromEntries(
					operationProperty.options.map((operation) => [
						operation.value,
						`${operation.routing.request.method} ${operation.routing.request.url}`,
					]),
				),
			];
		}),
	);
}

test('uses the public Whatsplaid API and capability discovery for credential testing', () => {
	const node = new Whatsplaid();
	const credential = new WhatsplaidApi();

	assert.equal(node.description.requestDefaults.baseURL, 'https://api.whatsplaid.com/v1');
	assert.equal(credential.test.request.baseURL, 'https://api.whatsplaid.com/v1');
	assert.equal(credential.test.request.url, '/capabilities');
	assert.equal(credential.test.request.method, 'GET');
});

test('covers every actionable Whatsplaid API 1.5.0 operation', () => {
	const operations = operationsByResource(new Whatsplaid().description);

	assert.deepEqual(operations, {
		account: {
			getCapabilities: 'GET /capabilities',
			getModules: 'GET /modules',
			getStore: 'GET /store',
			inspectDataSource: 'POST /ecommerce/integration/test',
		},
		aiAgent: {
			getPrompt: 'GET /ai-agent/prompt',
			updatePrompt: 'PATCH /ai-agent/prompt',
			getConversationState: 'GET =/conversations/{{$parameter.conversationId}}/ai-agent',
			setConversationState: 'PATCH =/conversations/{{$parameter.conversationId}}/ai-agent',
		},
		contact: {
			addTags: 'POST =/contacts/{{$parameter.contactId}}/tags',
			createOrUpdate: 'POST /contacts',
			get: 'GET =/contacts/{{$parameter.contactId}}',
			getMany: 'GET /contacts',
			removeTags: 'DELETE =/contacts/{{$parameter.contactId}}/tags',
			updateCustomFields: 'PATCH =/contacts/{{$parameter.contactId}}/custom-fields',
		},
		conversation: {
			getMany: 'GET /conversations',
			getMessages: 'GET =/conversations/{{$parameter.conversationId}}/messages',
		},
		handoff: { request: 'POST /handoffs' },
		message: { send: 'POST /messages/send' },
		order: {
			get: 'GET =/ecommerce/orders/{{$parameter.orderId}}',
			search: 'GET /ecommerce/orders/search',
		},
		product: {
			get: 'GET =/ecommerce/products/{{$parameter.productId}}',
			search: 'GET /ecommerce/products/search',
		},
		ticket: {
			close: 'POST =/tickets/{{$parameter.ticketId}}/close',
			get: 'GET =/tickets/{{$parameter.ticketId}}',
			getMany: 'GET /tickets',
		},
	});
});

test('does not expose aliases or outgoing event documentation as actions', () => {
	const operations = operationsByResource(new Whatsplaid().description);
	const routes = Object.values(operations).flatMap((resource) => Object.values(resource));

	assert.equal(routes.includes('GET /me'), false);
	assert.equal(routes.some((route) => route.includes('/webhook/outgoing/lead-capture')), false);
});
