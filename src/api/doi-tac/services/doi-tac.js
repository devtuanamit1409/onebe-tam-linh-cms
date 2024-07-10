'use strict';

/**
 * doi-tac service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::doi-tac.doi-tac');
