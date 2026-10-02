import type { INodeProperties } from 'n8n-workflow';

const getMany = { resource: ['conversation'], operation: ['getMany'] };

export const conversationDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['conversation'] } },
		options: [
			{
				name: 'Get Many', value: 'getMany', action: 'Get many conversations',
				routing: {
					request: { method: 'GET', url: '/conversations' },
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
				name: 'Get Messages', value: 'getMessages', action: 'Get conversation messages',
				routing: {
					request: { method: 'GET', url: '=/conversations/{{$parameter.conversationId}}/messages' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] },
				},
			},
		], default: 'getMany',
	},
	{
		displayName: 'Conversation ID', name: 'conversationId', type: 'string', required: true, default: '',
		displayOptions: { show: { resource: ['conversation'], operation: ['getMessages'] } },
	},
	{
		displayName: 'Return All', name: 'returnAll', type: 'boolean', default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: getMany }, routing: { send: { paginate: '={{$value}}' } },
	},
	{
		displayName: 'Limit', name: 'limit', type: 'number', default: 50,
		description: 'Max number of results to return', typeOptions: { minValue: 1, maxValue: 100 },
		displayOptions: { show: { resource: ['conversation'], operation: ['getMany'], returnAll: [false] } },
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
				displayName: 'Phone', name: 'phone', type: 'string', default: '',
				routing: { send: { type: 'query', property: 'phone' } },
			},
		],
	},
];
