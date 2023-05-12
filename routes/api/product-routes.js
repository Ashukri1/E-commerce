const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          },
          {
            model: Tag,
            attributes: ['id', 'name'],
            },
            {
              model: ProductTag,
              attributes: ['id', 'product_id', 'tag_id'],
              },
              ],
              });
              // if there's an error, return the error
              if (productData) {
                res.status(200).json(productData);
                }
                // if there's no product, return an empty array
                else {
                  res.status(404).json({ message: 'No products found' });
                  }
                  }
                  catch (err) {
                    res.status(500).json(err);
                    }
                    }
                    );
                    // POST route for saving a new product
                    router.post('/', async (req, res) => {
                      // create a product, information comes from the body of the request
                      try {
                        const productData = await Product.create(req.body);
                        // if there's an error, return the error
                        if (productData) {
                          res.status(200).json(productData);
                          }
                          // if there's no product, return an empty array
                          else {
                            res.status(404).json({ message: 'No products found' });
                            }
                            }
                            catch (err) {
                              res.status(500).json(err);
                              }
                              });
                              // PUT route for updating a product
                              router.put('/:id', async (req, res) => {
                                // find the product with the given id
                                // update it with the info in the body
                                // return the new product
                                try {
                                  const productData = await Product.update(
                                    req.body,
                                    {
                                      where: {
                                        id: req.params.id,
                                        },
                                        }
                                        );
                                        // if there's an error, return the error
                                        if (productData) {
                                          res.status(200).json(productData);
                                          }
                                          // if there's no product, return an empty array
                                          else {
                                            res.status(404).json({ message: 'No products found' });
                                            }
                                            }
                                            catch (err) {
                                              res.status(500).json(err);
                                              }
                                              });
                                              // DELETE route for deleting a product
                                              router.delete('/:id', async (req, res) => {
                                                // find the product with the given id
                                                // delete it
                                                // return the deleted product
                                                try {
                                                  const productData = await Product.destroy(
                                                    {
                                                      where: {
                                                        id: req.params.id,
                                                        },
                                                        }
                                                        );
                                                        // if there's an error, return the error
                                                        if (productData) {
                                                          res.status(200).json(productData);
                                                          }
                                                          // if there's no product, return an empty array
                                                          else {
                                                            res.status(404).json({ message: 'No products found' });
                                                            }
                                                            }
                                                            catch (err) {
                                                              res.status(500).json(err);
                                                              }
                                                              });
                                                              module.exports = router;

