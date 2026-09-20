import type { INodeProperties } from 'n8n-workflow';

export const productDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['product'] } },
		options: [
			{ name: 'Get', value: 'get', action: 'Get a product', routing: { request: { method: 'GET', url: '=/ecommerce/products/{{$parameter.productId}}' } } },
			{ name: 'Search', value: 'search', action: 'Search products', description: 'Search the data source configured for the Whatsplaid account', routing: { request: { method: 'GET', url: '/ecommerce/products/search' } } },
		], default: 'search',
	},
	{ displayName: 'Product ID', name: 'productId', type: 'string', required: true, default: '', displayOptions: { show: { resource: ['product'], operation: ['get'] } } },
	{ displayName: 'Query', name: 'query', type: 'string', default: '', description: 'Product name, SKU, tag, or description', displayOptions: { show: { resource: ['product'], operation: ['search'] } }, routing: { send: { type: 'query', property: 'q' } } },
	{ displayName: 'Product URL', name: 'url', type: 'string', default: '', description: 'Known product URL when available', displayOptions: { show: { resource: ['product'], operation: ['search'] } }, routing: { send: { type: 'query', property: 'url' } } },
];
