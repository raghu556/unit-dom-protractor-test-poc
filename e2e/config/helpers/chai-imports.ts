import * as _chai from 'chai';
import * as cap from 'chai-as-promised';
import smoothie = require('chai-smoothie');

_chai.use(cap);
_chai.use(smoothie);

export const expect = _chai.expect;
export const assert = _chai.assert;
export const should = _chai.should();
