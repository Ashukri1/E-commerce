const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'image_url'],
          },
          ],
          });
          const tags = tagData.map((tag) => tag.get({ plain: true }));
          res.status(200).json(tags);
          } catch (err) {
            res.status(500).json(err);
            }
            });
            // POST route for adding a new tag
            router.post('/', async (req, res) => {
              // create a new tag
              try {
                const tagData = await Tag.create({
                  tag_name: req.body.tag_name,
                  });
                  // add the new tag to the product
                  const newTag = await Tag.findByPk(tagData.id, {
                    include: [
                      {
                        model: Product,
                        attributes: ['id', 'product_name', 'price', 'stock', 'image_url'],
                        },
                        ],
                        });
                        res.status(200).json(newTag);
                        } catch (err) {
                          res.status(500).json(err);
                          }
                          });
                          // DELETE route for removing a tag
                          router.delete('/:id', async (req, res) => {
                            // delete a tag by its `id` value
                            try {
                              const tagData = await Tag.destroy({
                                where: {
                                  id: req.params.id,
                                  },
                                  });
                                  res.status(200).json(tagData);
                                  } catch (err) {
                                    res.status(500).json(err);
                                    }
                                    });
                                    module.exports = router;