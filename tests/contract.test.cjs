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

function operation(description, resource, value) {
	return description.properties
		.find(
			(property) =>
				property.name === 'operation' && property.displayOptions?.show?.resource?.includes(resource),
		)
		.options.find((candidate) => candidate.value === value);
}

function property(description, resource, operationValue, name) {
	return description.properties.find(
		(candidate) =>
			candidate.name === name &&
			candidate.displayOptions?.show?.resource?.includes(resource) &&
			candidate.displayOptions?.show?.operation?.includes(operationValue),
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

test('uses the standard Return All pattern and internal offset pagination for list operations', () => {
	const description = new Whatsplaid().description;

	for (const resource of ['contact', 'ticket', 'conversation']) {
		const listOperation = operation(description, resource, 'getMany');
		const pagination = listOperation.routing.operations.pagination;
		const returnAll = property(description, resource, 'getMany', 'returnAll');
		const limit = property(description, resource, 'getMany', 'limit');

		assert.deepEqual(pagination, {
			type: 'offset',
			properties: {
				limitParameter: 'limit',
				offsetParameter: 'offset',
				pageSize: 100,
				type: 'query',
			},
		});
		assert.equal(returnAll.routing.send.paginate, '={{$value}}');
		assert.deepEqual(limit.displayOptions.show.returnAll, [false]);
		assert.equal(property(description, resource, 'getMany', 'offset'), undefined);
	}
});

test('groups optional inputs into n8n collections', () => {
	const description = new Whatsplaid().description;
	const expectedCollections = [
		['contact', 'createOrUpdate', 'additionalFields', ['customFields', 'email', 'name', 'tags']],
		['contact', 'getMany', 'filters', ['dateFrom', 'email', 'phone', 'tag']],
		['ticket', 'getMany', 'filters', ['dateFrom', 'phone', 'status']],
		['conversation', 'getMany', 'filters', ['dateFrom', 'phone']],
		['handoff', 'request', 'additionalFields', ['category', 'email', 'name', 'priority', 'reason']],
		['order', 'search', 'additionalFields', ['email', 'number', 'phone']],
		['product', 'search', 'additionalFields', ['url']],
		['aiAgent', 'updatePrompt', 'additionalFields', ['expectedRevision']],
	];

	for (const [resource, operationValue, name, expectedOptions] of expectedCollections) {
		const collection = property(description, resource, operationValue, name);
		assert.equal(collection.type, 'collection');
		assert.deepEqual(
			collection.options.map((option) => option.name),
			expectedOptions,
		);
	}
});
