import type { INodeProperties } from 'n8n-workflow';

const getMany = { resource: ['contact'], operation: ['getMany'] };
const createOrUpdate = { resource: ['contact'], operation: ['createOrUpdate'] };
const byId = {
	resource: ['contact'],
	operation: ['get', 'addTags', 'removeTags', 'updateCustomFields'],
};

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['contact'] } },
		options: [
			{
				name: 'Add Tags', value: 'addTags', action: 'Add tags to a contact',
				routing: { request: { method: 'POST', url: '=/contacts/{{$parameter.contactId}}/tags' } },
			},
			{
				name: 'Create or Update', value: 'createOrUpdate', action: 'Create or update a contact',
				routing: { request: { method: 'POST', url: '/contacts' } },
			},
			{
				name: 'Get', value: 'get', action: 'Get a contact',
				routing: { request: { method: 'GET', url: '=/contacts/{{$parameter.contactId}}' } },
			},
			{
				name: 'Get Many', value: 'getMany', action: 'Get many contacts',
				routing: {
					request: { method: 'GET', url: '/contacts' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] },
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit', offsetParameter: 'offset', pageSize: 100, type: 'query',
							},
						},
					},
				},
			},
			{
				name: 'Remove Tags', value: 'removeTags', action: 'Remove tags from a contact',
				routing: { request: { method: 'DELETE', url: '=/contacts/{{$parameter.contactId}}/tags' } },
			},
			{
				name: 'Update Custom Fields', value: 'updateCustomFields', action: 'Update contact custom fields',
				routing: { request: { method: 'PATCH', url: '=/contacts/{{$parameter.contactId}}/custom-fields' } },
			},
		],
		default: 'createOrUpdate',
	},
	{ displayName: 'Contact ID', name: 'contactId', type: 'string', required: true, default: '', displayOptions: { show: byId } },
	{
		displayName: 'Phone', name: 'phone', type: 'string', required: true, default: '',
		displayOptions: { show: createOrUpdate }, routing: { send: { type: 'body', property: 'phone' } },
	},
	{
		displayName: 'Additional Fields', name: 'additionalFields', type: 'collection',
		placeholder: 'Add Field', default: {}, displayOptions: { show: createOrUpdate },
		options: [
			{
				displayName: 'Custom Fields', name: 'customFields', type: 'json', default: '{}',
				description: 'JSON object containing custom contact attributes',
				routing: { send: { type: 'body', property: 'custom_fields' } },
			},
			{
				displayName: 'Email', name: 'email', type: 'string', placeholder: 'name@email.com', default: '',
				routing: { send: { type: 'body', property: 'email' } },
			},
			{
				displayName: 'Name', name: 'name', type: 'string', default: '',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'Tags', name: 'tags', type: 'json', default: '[]',
				description: 'JSON array of tag names, for example ["customer", "vip"]',
				routing: { send: { type: 'body', property: 'tags' } },
			},
		],
	},
	{
		displayName: 'Tags', name: 'tags', type: 'json', required: true, default: '[]',
		description: 'JSON array of tag names, for example ["customer", "vip"]',
		displayOptions: { show: { resource: ['contact'], operation: ['addTags', 'removeTags'] } },
		routing: { send: { type: 'body', property: 'tags' } },
	},
	{
		displayName: 'Custom Fields', name: 'customFieldsPatch', type: 'json', default: '{}', required: true,
		description: 'JSON object to merge into the contact custom fields',
		displayOptions: { show: { resource: ['contact'], operation: ['updateCustomFields'] } },
		routing: { send: { type: 'body', value: '={{$value}}' } },
	},
	{
		displayName: 'Return All', name: 'returnAll', type: 'boolean', default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: getMany }, routing: { send: { paginate: '={{$value}}' } },
	},
	{
		displayName: 'Limit', name: 'limit', type: 'number', default: 50,
		description: 'Max number of results to return', typeOptions: { minValue: 1, maxValue: 100 },
		displayOptions: { show: { resource: ['contact'], operation: ['getMany'], returnAll: [false] } },
		routing: { send: { type: 'query', property: 'limit' } },
	},
	{
		displayName: 'Filters', name: 'filters', type: 'collection', placeholder: 'Add Filter',
		default: {}, displayOptions: { show: getMany },
		options: [
			{
				displayName: 'Created From', name: 'dateFrom', type: 'dateTime', default: '',
				routing: { send: { type: 'query', property: 'date_from' } },
			},
			{
				displayName: 'Email', name: 'email', type: 'string', placeholder: 'name@email.com', default: '',
				routing: { send: { type: 'query', property: 'email' } },
			},
			{
				displayName: 'Phone', name: 'phone', type: 'string', default: '',
				routing: { send: { type: 'query', property: 'phone' } },
			},
			{
				displayName: 'Tag', name: 'tag', type: 'string', default: '',
				routing: { send: { type: 'query', property: 'tag' } },
			},
		],
	},
];
