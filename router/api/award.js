const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Award = require('../../models/Award');

// @route   GET api/awards
// @desc    Get award list
// @access  Public

router.get('/', async (req, res) => {
  try {
    const awards = await Award.find().sort({ date: -1 });
    res.json(awards);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever Error');
  }
});

// @route   Post api/awards
// @desc    Add award
// @access  Private

router.post('/', [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name');

    const {
      year,
      scholarshipFirst,
      scholarshipFirstPrice,
      scholarshipSecond,
      scholarshipSecondPrice,
      scholarshipThird,
      scholarshipThirdPrice,
      literaryFirst,
      literaryFirstAward,
      literarySecond,
      literarySecondAward,
      literaryThird,
      literaryThirdAward
    } = req.body;

    const newAward = new Award({
      writer: user.name,
      year,
      scholarshipFirst,
      scholarshipFirstPrice,
      scholarshipSecond,
      scholarshipSecondPrice,
      scholarshipThird,
      scholarshipThirdPrice,
      literaryFirst,
      literaryFirstAward,
      literarySecond,
      literarySecondAward,
      literaryThird,
      literaryThirdAward
    });
    await newAward.save();

    const awards = await Award.find().sort({ year: -1 });

    res.json(awards);
  } catch (error) {
    console.log('**Award errors**', error.message);
    res.status(500).send('서버 에러');
  }
});

// // @route    DELETE api/awards/:id
// // @desc     Delete a post
// // @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const award = await Award.findById(req.params.id);

    if (!award) {
      return res.status(404).json({ msg: '장학생이 존재하지 않습니다.' });
    }

    await award.remove();

    const awards = await Award.find().sort({ year: -1 });
    res.json(awards);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '장학생이 존재하지 않습니다.' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
