const config = {
  url: 'https://partner-test.depotnextdoor.com/v2/api-docs?group=api',
  arr: [
    { name: 'sale.js', tags: ['销售-销售订单', '销售-退货订单'] }, //销售
    {
      name: 'purchase.js',
      tags: [
        '省供应链商品',
        '4.0.1:purchase-product',
        '进货-采购商品',
        '进货-购物车',
        '进货-进货单据',
        '进货-申请单据',
        '进货-退货单据',
      ],
    }, //进货
    {
      name: 'promotion.js',
      tags: [
        '促销-门店促销-组合促销',
        '促销-门店促销-特价促销',
        '促销-门店促销-满减促销',
        '促销-门店促销-促销设置',
        '促销-快喝促销-优惠卷促销',
        '促销-快喝促销-满减促销',
      ],
    }, //促销
    { name: 'commodity.js', tags: ['5.0.1', '5.0.2', '5.1.1', '5.1.2', '5.1.3', '5.1.4', '5.1.5'] }, //商品
  ],
  type: 'services', //services|mock|models
};
module.exports = config;
