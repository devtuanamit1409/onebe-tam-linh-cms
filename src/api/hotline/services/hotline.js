'use strict';

/**
 * hotline service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hotline.hotline');
