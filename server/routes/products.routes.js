const express = require("express");
const router = express.Router();
const db = require("../utils/database");
const _ = require("lodash");

router.get("/", async (req, res) => {
    try {
        let data = await db.execute(
            `SELECT * FROM product 
                INNER JOIN listing ON product.productId = listing.listingId ;`
        );
        let data1 = await db.execute(`SELECT product.*, tag.*  FROM tag_products
                                        INNER JOIN tag ON tag_products.tagId = tag.tagId  
                                        INNER JOIN product ON tag_products.productId = product.productId
                                        ORDER BY product.productId`);

        let data2 = await db.execute(`SELECT product.*, comment.*  FROM comment
                                        INNER JOIN product ON comment.productId = product.productId
                                        ORDER BY product.productId`);
        let [row] = data;
        let [row1] = data1;
        let [row2] = data2;

        row1 = _.groupBy(row1, "productId");
        row2 = _.groupBy(row2, "productId");
        let tags = Object.values(row1);
        let comments = Object.values(row2);
        console.log(row);

        row = row.map((e, i) => {
            return {
                productId: e.productId,
                productName: e.productName,
                status: e.status,
                listing: {
                    description: e.description,
                    price: e.price,
                    rate: e.rate,
                },
                comments: comments[i].map((c) => {
                    return {
                        commentId: c.commentId,
                        content: c.content,
                    };
                }),

                tags: tags[i].map((t) => {
                    return {
                        tagId: t.tagId,
                        tagName: t.tagName,
                    };
                }),
            };
        });

        res.json(row);
    } catch (error) {
        res.json(error);
    }
});

// Get one product
router.get("/:id", (req, res) => {
    res.json("one product");
});

// Create
router.post("/", (req, res) => {
    res.json("create success product");
});

// Update
router.patch("/:id", (req, res) => {
    res.json("update success product");
});

// Delete
router.delete("/:id", (req, res) => {
    res.json("delete success product");
});

module.exports = router;
