import type { INodeProperties } from 'n8n-workflow';

export const conversationDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['conversation'] } },
		options: [
			{ name: 'Get Many', value: 'getMany', action: 'Get many conversations', routing: { request: { method: 'GET', url: '/conversations' }, output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] } } },
			{ name: 'Get Messages', value: 'getMessages', action: 'Get conversation messages', routing: { request: { method: 'GET', url: '=/conversations/{{$parameter.conversationId}}/messages' }, output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] } } },
		], default: 'getMany',
	},
	{ displayName: 'Conversation ID', name: 'conversationId', type: 'string', required: true, default: '', displayOptions: { show: { resource: ['conversation'], operation: ['getMessages'] } } },
	{ displayName: 'Phone Filter', name: 'phone', type: 'string', default: '', displayOptions: { show: { resource: ['conversation'], operation: ['getMany'] } }, routing: { send: { type: 'query', property: 'phone' } } },
	{ displayName: 'Created From', name: 'dateFrom', type: 'dateTime', default: '', displayOptions: { show: { resource: ['conversation'], operation: ['getMany'] } }, routing: { send: { type: 'query', property: 'date_from' } } },
	{ displayName: 'Limit', name: 'limit', type: 'number',
																																								description: 'Max number of results to return', typeOptions: { minValue: 1, maxValue: 100 }, default: 50, displayOptions: { show: { resource: ['conversation'] } }, routing: { send: { type: 'query', property: 'limit' } } },
	{ displayName: 'Offset', name: 'offset', type: 'number', typeOptions: { minValue: 0 }, default: 0, displayOptions: { show: { resource: ['conversation'] } }, routing: { send: { type: 'query', property: 'offset' } } },
];
