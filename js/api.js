
const api_url = '/admin_xpx/driver_salary_online.php'
/*获取配送员工资配置所有过滤项*/
const get_init_filter_data = (params) => {
    params.act = 'getInitFilterData'
    return service({
        url:api_url,
        method: 'get',
        params: params
    })
}

/*获取仓库列表*/
const get_warehouse = (params) => {
    params.act = 'getCangList'
    return service({
        url:api_url,
        method: 'get',
        params: params
    })
}
/*获取配送员列表页面*/
const get_delivery_sal_conf_list = (params) => {
    params.act = 'driverSalaryConfigurationList'
    return service({
        url:api_url,
        method: 'get',
        params: params
    })
}

/*改变当前配置状态*/
const change_driver_salary_status = (params) => {
    params.act = 'disableDriverConfigOne'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
// 获取配送员 配置详情

/*获取配送员列表页面*/
const get_driver_config_detail = (params) => {
    params.act = 'getDriverConfigDetail'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/*编辑配置有效期*/
const edit_driver_config_date = (params) => {
    params.act = 'driverConfigEdit'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/*  计件规则   */
// 添加-获取商品列表
const getGoodsInfoByAdd = (params) => {
    params.act = 'getGoodsInfoByAdd'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}

// 添加计件规则
const pieceCountingRuleAdd = (params) => {
    params.act = 'pieceCountingRuleAdd'
    return service({
        url: api_url,
        method: 'post',
        data: params
    })
}
// 改变规则状态
const disablePieceCountingRuleOne = (params) => {
    params.act = 'disablePieceCountingRuleOne'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
// 获取计件规则详情
const getPieceCountingRuleDetail = (params) => {
    params.act = 'getPieceCountingRuleDetail'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
// 日记列表
const PieceCountingRuleLogList = (params) => {
    params.act = 'PieceCountingRuleLogList'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
// 编辑有效期
const PieceCountingRuleEdit = (params) => {
    params.act = 'PieceCountingRuleEdit'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}

/*  计件规则 end   */

/*----司机结算费用申请原因配置 start -  */
const getDriverSettlementFeeApplicationReasonList = (params) => {
    params.act = 'getDriverSettlementFeeApplicationReasonList'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
// disable
const disableSettlementFeeOne = (params) => {
    params.act = 'disableSettlementFeeOne'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
const settlementFeeApplicationDelete = (params) => {
    params.act = 'settlementFeeApplicationDelete'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
const settlementFeeApplicationAdd = (params) => {
    params.act = 'settlementFeeApplicationAdd'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}

/*  司机结算费用申请原因配置 end   */

/*  司机结算费用申请列表 start   */
const getDriverSettlementFeeApplicationList = (params) => {
    params.act = 'getDriverSettlementFeeApplicationList'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
const getDeliveryListByOrderSn = (params) => {
    params.act = 'getDeliveryListByOrderSn'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
const getDeliveryDriverList = (params) => {
    params.act = 'getDeliveryDriverList'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}


const getDriverSettlementFeeApplicationConfigByType = (params) => {
    params.act = 'getDriverSettlementFeeApplicationConfigByType'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
// 添加
const DriverSettlementFeeApplicationAdd = (params) => {
    params.act = 'DriverSettlementFeeApplicationAdd'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
// 批量审批
const DriverSettlementFeeApplicationBatchCheck = (params) => {
    params.act = 'DriverSettlementFeeApplicationBatchCheck'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}


/*司机结算费用申请列表 end  */


/* 配送员司机工资 s   */

//配送员司机工资列表
const getDriverSalaryList = (params) => {
    params.act = 'getDriverSalaryList'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
//配送员司机工资详情
const getDriverSalaryDetailData = (params) => {
    params.act = 'getDriverSalaryDetailData'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/* 配送员司机工资 e */


/* 配送员司机标签s   */
//列表
const getDriverFeedbackLabelList = (params) => {
    params.act = 'getDriverFeedbackLabelList'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
//删除
const DriverFeedbackLabelDelete = (params) => {
    params.act = 'DriverFeedbackLabelDelete'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}

/**
 * 改变反馈标签启用状态
 * @param params
 * @returns {*}
 */
const disableDriverFeedbackLabelOne = (params) => {
    params.act = 'disableDriverFeedbackLabelOne'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}

/**
 * 改变反馈标签启用状态
 * @param params
 * @returns {*}
 */
const driverFeedbackLabelEdit = (params) => {
    params.act = 'driverFeedbackLabelEdit'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/* 配送员司机标签e */

/**
 * 司机申诉审核列表
 * @param params
 * @returns {*}
 */
const getDriverAppealCheckList = (params) => {
    params.act = 'getDriverAppealCheckList'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/**
 * 司机申诉详情
 * @param params
 * @returns {*}
 */
const getDriverAppealCheckDetail = (params) => {
    params.act = 'getDriverAppealCheckDetail'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/**
 * 编辑司机申诉详情二级选项
 * @param params
 * @returns {*}
 */
const DriverAppealCheckSecondEdit = (params) => {
    params.act = 'DriverAppealCheckSecondEdit'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/**
 * 编辑司机申诉审核
 * @param params
 * @returns {*}
 */
const driverAppealCheck = (params) => {
    params.act = 'driverAppealCheck'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}
/**
 * 添加反馈标签
 * @param params
 * @returns {*}
 */
const driverFeedbackLabelAdd = (params) => {
    params.act = 'driverFeedbackLabelAdd'
    return service({
        url: api_url,
        method: 'get',
        params: params
    })
}


/* 配送员司机标签e   */

/*司机工资日志设置*/
/*const get_delivery_sal_conf_logs = (params) => {
    return service({
        url: '/admin_xpx/driver_salary_online.php?act=driverSalaryConfigLogList',
        method: 'get',
        params: params
    })
}*/

/*配送员配置日志列表*/
const  get_delivery_sal_conf_logs = 'driverSalaryConfigLogList'
const  get_city_districts = 'getCityDistricts'
const  DriverConfigAdd = 'DriverConfigAdd'

/*通用 get*/
const $get = (params, act) => {
    return service({
        url: api_url+'?act='+act,
        method: 'get',
        params: params
    })
}
/*通用 post*/
const $post = (data, act) => {
    return service({
        url:  api_url+'?act='+act,
        method: 'post',
        data: data
    })
}
