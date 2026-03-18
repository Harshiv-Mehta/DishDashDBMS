"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const misc_controller_1 = require("../controllers/misc.controller");
const router = (0, express_1.Router)();
router.get('/categories', misc_controller_1.getCategories);
router.get('/stats', misc_controller_1.getStats);
exports.default = router;
