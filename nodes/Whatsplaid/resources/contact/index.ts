import type { INodeProperties } from 'n8n-workflow';

const getMany = { resource: ['contact'], operation: ['getMany'] };
const createOrUpdate = { resource: ['contact'], operation: ['createOrUpdate'] };
const byId = { resource: ['contact'], operation: ['get', 'addTags', 'removeTags', 'updateCustomFields'] };

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['contact'] } },
		options: [
			{ name: 'Add Tags', value: 'addTags', action: 'Add tags to a contact', routing: { request: { method: 'POST', url: '=/contacts/{{$parameter.contactId}}/tags' } } },
			{ name: 'Create or Update', value: 'createOrUpdate', action: 'Create or update a contact', routing: { request: { method: 'POST', url: '/contacts' } } },
			{ name: 'Get', value: 'get', action: 'Get a contact', routing: { request: { method: 'GET', url: '=/contacts/{{$parameter.contactId}}' } } },
			{ name: 'Get Many', value: 'getMany', action: 'Get many contacts', routing: { request: { method: 'GET', url: '/contacts' }, output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] } } },
			{ name: 'Remove Tags', value: 'removeTags', action: 'Remove tags from a contact', routing: { request: { method: 'DELETE', url: '=/contacts/{{$parameter.contactId}}/tags' } } },
			{ name: 'Update Custom Fields', value: 'updateCustomFields', action: 'Update contact custom fields', routing: { request: { method: 'PATCH', url: '=/contacts/{{$parameter.contactId}}/custom-fields' } } },
		],
		default: 'createOrUpdate',
	},
	{ displayName: 'Contact ID', name: 'contactId', type: 'string', required: true, default: '', displayOptions: { show: byId } },
	{ displayName: 'Phone', name: 'phone', type: 'string', required: true, default: '', displayOptions: { show: createOrUpdate }, routing: { send: { type: 'body', property: 'phone' } } },
	{ displayName: 'Name', name: 'name', type: 'string', default: '', displayOptions: { show: createOrUpdate }, routing: { send: { type: 'body', property: 'name' } } },
	{ displayName: 'Email', name: 'email', type: 'string',
																																								placeholder: 'name@email.com', default: '', displayOptions: { show: createOrUpdate }, routing: { send: { type: 'body', property: 'email' } } },
	{
		displayName: 'Tags', name: 'tags', type: 'json', default: '[]',
		description: 'JSON array of tag names, for example ["customer", "vip"]',
		displayOptions: { show: { resource: ['contact'], operation: ['createOrUpdate', 'addTags', 'removeTags'] } },
		routing: { send: { type: 'body', property: 'tags' } },
	},
	{
		displayName: 'Custom Fields', name: 'customFields', type: 'json', default: '{}',
		description: 'JSON object containing custom contact attributes',
		displayOptions: { show: createOrUpdate }, routing: { send: { type: 'body', property: 'custom_fields' } },
	},
	{
		displayName: 'Custom Fields', name: 'customFieldsPatch', type: 'json', default: '{}', required: true,
		description: 'JSON object to merge into the contact custom fields',
		displayOptions: { show: { resource: ['contact'], operation: ['updateCustomFields'] } },
		routing: { send: { type: 'body', value: '={{$value}}' } },
	},
	{ displayName: 'Phone Filter', name: 'phoneFilter', type: 'string', default: '', displayOptions: { show: getMany }, routing: { send: { type: 'query', property: 'phone' } } },
	{ displayName: 'Email Filter', name: 'emailFilter', type: 'string', default: '', displayOptions: { show: getMany }, routing: { send: { type: 'query', property: 'email' } } },
	{ displayName: 'Tag Filter', name: 'tagFilter', type: 'string', default: '', displayOptions: { show: getMany }, routing: { send: { type: 'query', property: 'tag' } } },
	{ displayName: 'Created From', name: 'dateFrom', type: 'dateTime', default: '', displayOptions: { show: getMany }, routing: { send: { type: 'query', property: 'date_from' } } },
	{ displayName: 'Limit', name: 'limit', type: 'number',
																																								description: 'Max number of results to return', typeOptions: { minValue: 1, maxValue: 100 }, default: 50, displayOptions: { show: getMany }, routing: { send: { type: 'query', property: 'limit' } } },
	{ displayName: 'Offset', name: 'offset', type: 'number', typeOptions: { minValue: 0 }, default: 0, displayOptions: { show: getMany }, routing: { send: { type: 'query', property: 'offset' } } },
];
