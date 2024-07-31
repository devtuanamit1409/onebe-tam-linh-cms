'use strict';

/**
 * hotline router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hotline.hotline');
