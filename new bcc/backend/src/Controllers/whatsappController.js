const request = require("request");
require("dotenv").config();
const { query } = require("../utils/database");

const sendMessageWinnerInfo = async (req, res) => {
  const { sch_id, name, bcid } = req.body;
  const resData = {
    status: false,
    answer: "",
  };

  try {
    const templateName = "winner_info";
    const languageCode = "en";

    const findNumberQuery = `
            SELECT tm.mem_mobile, tm.mem_name 
            FROM tbl_member tm 
            JOIN tbl_schememember ts 
            ON tm.mem_id = ts.schmem_mem_id 
            WHERE ts.schmem_sch_id= ?`;

    const result = await query(findNumberQuery, [sch_id]);

    // Assuming 'result' is an array of objects with 'mem_mobile' and 'mem_name' properties
    const mobileNumbers = result.map((row) => row.mem_mobile);
    console.log(mobileNumbers);

    const findSchemeQuery = `
    SELECT sch_name
    FROM tbl_scheme 
    WHERE sch_id=?`;
    const result1 = await query(findSchemeQuery, [sch_id]);
    const schname = result1[0].sch_name;

    const findbcnoQuery = `
      SELECT bc_no
      FROM tbl_bcdate 
      WHERE bcdate_id=?`;
    const result2 = await query(findbcnoQuery, [bcid]);
    const bcno = result2[0].bc_no;
    // Send message to each mobile number
    for (let i = 0; i < mobileNumbers.length; i++) {
      const options = {
        method: "POST",
        url: "https://graph.facebook.com/v20.0/306082309265432/messages",
        headers: {
          Authorization: `Bearer EAAGZCJwDqMnwBOzLp1ZCSxw8VURhioObrcOBNugeFv4TzCUfgZB25FHqCspZBhbAzCZC15ZBGhePPgmgQBKScerNfJM7BLz5IkqZBHgdBJs74hsRykrvImtGafqiBJ7mJK1H9hHmeI9rPV3KpBipBbsZANeWzNCIL613WmOl07LELkN0kz4CLDuBbFRxALU7jV4kh5aoNkvMtUS6CSROK8YZD`,
          "Content-Type": "application/json",
        },
        body: {
          messaging_product: "whatsapp",
          to: mobileNumbers[i],
          type: "template",
          template: {
            name: templateName,
            language: {
              code: languageCode,
            },
            components: [
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: schname, // Use the 'month' variable
                  },
                  {
                    type: "text",
                    text: bcno, // Use the 'name' variable
                  },
                  {
                    type: "text",
                    text: name, // Use the 'name' variable
                  },
                ],
              },
            ],
          },
        },
        json: true,
      };

      // Await sending the request within the loop
      await new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if (error) {
            resData.status = false;
            resData.answer = error.message;
            reject(error);
          } else {
            resData.status = true;
            resData.respondData = body;
            resolve(body);
          }
        });
      });
    }

    return res.status(200).json(resData);
  } catch (e) {
    resData.status = false;
    resData.answer = e.message;
    return res.status(500).json(resData);
  }
};













const sendWinner = async (req, res) => {
  const { sch_id, name, bcid, mem_id } = req.body;

  const resData = {
    status: false,
    answer: "",
  };

  try {
    const templateName = "winner";
    const languageCode = "en";

    // Query to find scheme name based on sch_id
    const findSchemeQuery = `
            SELECT sch_name
            FROM tbl_scheme 
            WHERE sch_id=?`;
    // Assuming you have a function or method 'query' to execute SQL queries
    const result = await query(findSchemeQuery, [sch_id]);
    const schname = result[0].sch_name;

    const findbcnoQuery = `
        SELECT bc_no
        FROM tbl_bcdate 
        WHERE bcdate_id=?`;
    // Assuming you have a function or method 'query' to execute SQL queries
    const result2 = await query(findbcnoQuery, [bcid]);
    const bcno = result2[0].bc_no;

    // Query to find member mobile number based on mem_id
    const findNumberQuery = `
            SELECT mem_mobile
            FROM tbl_member 
            WHERE mem_id=?
        `;
    // Assuming you have a function or method 'query' to execute SQL queries
    const result1 = await query(findNumberQuery, [mem_id]);
    const mem_mobile = result1[0].mem_mobile;

    const options = {
      method: "POST",
      url: "https://graph.facebook.com/v20.0/306082309265432/messages",
      headers: {
        Authorization: `Bearer EAAGZCJwDqMnwBOzLp1ZCSxw8VURhioObrcOBNugeFv4TzCUfgZB25FHqCspZBhbAzCZC15ZBGhePPgmgQBKScerNfJM7BLz5IkqZBHgdBJs74hsRykrvImtGafqiBJ7mJK1H9hHmeI9rPV3KpBipBbsZANeWzNCIL613WmOl07LELkN0kz4CLDuBbFRxALU7jV4kh5aoNkvMtUS6CSROK8YZD`,
        "Content-Type": "application/json",
      },
      body: {
        messaging_product: "whatsapp", // Adjust if necessary
        to: mem_mobile,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: name, // Use the 'schname' variable
                },
                {
                  type: "text",
                  text: bcno, // Use the 'name' variable
                },
                {
                  type: "text",
                  text: schname, // Use the 'bcno' variable if needed
                },
              ],
            },
          ],
        },
      },
      json: true,
    };

    // Await sending the request within the try block
    const response = await new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          resData.status = false;
          resData.answer = error.message;
          reject(error);
        } else {
          resData.status = true;
          resData.respondData = body;
          resolve(body);
        }
      });
    });

    // Return response data to the client
    return res.status(200).json(resData);
  } catch (error) {
    // Handle errors
    resData.status = false;
    resData.answer = error.message;
    return res.status(500).json(resData);
  }
};

const sendPenddingAmount = async (req, res) => {
  const { name, mem_id, amount, bcno,sch_id } = req.body;
  const resData = {
    status: false,
    answer: "",
  };

  try {
    const templateName = "pendding_amount";
    const languageCode = "en";

    const findSchemeQuery = `
         SELECT sch_name
         FROM tbl_scheme
         WHERE sch_id=?`;
    const res = await query(findSchemeQuery, [sch_id]);
    const schname = res[0].sch_name;

    const findmobileQuery = `
         SELECT mem_mobile
         FROM tbl_member 
         WHERE mem_id=?`;
    const result1 = await query(findmobileQuery, [mem_id]);
    const mobile = result1[0].mem_mobile;

    console.log(result1);

    const options = {
      method: "POST",
      url: "https://graph.facebook.com/v20.0/306082309265432/messages",
      headers: {
        Authorization: `Bearer EAAGZCJwDqMnwBOzLp1ZCSxw8VURhioObrcOBNugeFv4TzCUfgZB25FHqCspZBhbAzCZC15ZBGhePPgmgQBKScerNfJM7BLz5IkqZBHgdBJs74hsRykrvImtGafqiBJ7mJK1H9hHmeI9rPV3KpBipBbsZANeWzNCIL613WmOl07LELkN0kz4CLDuBbFRxALU7jV4kh5aoNkvMtUS6CSROK8YZD`,
        "Content-Type": "application/json",
      },
      body: {
        messaging_product: "whatsapp",
        to: mobile,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: name, // Use the 'month' variable
                },
                {
                  type: "text",
                  text: schname, // Use the 'month' variable
                },
                {
                  type: "text",
                  text: bcno, // Use the 'name' variable
                },
                {
                  type: "text",
                  text: amount, // Use the 'month' variable
                },
              ],
            },
          ],
        },
      },
      json: true,
    };

    // Await sending the request within the loop
    await new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          resData.status = false;
          resData.answer = error.message;
          reject(error);
        } else {
          resData.status = true;
          resData.respondData = body;
          resolve(body);
        }
      });
    });

    return res.status(200).json(resData);
  } catch (e) {
    resData.status = false;
    resData.answer = e.message;
    return res.status(500).json(resData);
  }
};

const sendbcDate = async (req, res) => {
  const { sch_id, bcno, date } = req.body;
  console.log(req.body);

  const resData = {
    status: false,
    answer: "",
  };

  try {
    const templateName = "bc_date";
    const languageCode = "en";

    const findNumberQuery = `
      SELECT tm.mem_mobile, tm.mem_name 
      FROM tbl_member tm 
      JOIN tbl_schememember ts 
      ON tm.mem_id = ts.schmem_mem_id 
      WHERE ts.schmem_sch_id= ?
    `;

    const result = await query(findNumberQuery, [sch_id]);
    const mobileNumbers = result.map((row) => row.mem_mobile);
    console.log(mobileNumbers);

    const findSchemeQuery = `
      SELECT sch_name
      FROM tbl_scheme 
      WHERE sch_id=?
    `;
    const result1 = await query(findSchemeQuery, [sch_id]);
    const schname = result1[0].sch_name;

    const options = {
      method: "POST",
      url: "https://graph.facebook.com/v20.0/306082309265432/messages",
      headers: {
        Authorization: `Bearer EAAGZCJwDqMnwBOzLp1ZCSxw8VURhioObrcOBNugeFv4TzCUfgZB25FHqCspZBhbAzCZC15ZBGhePPgmgQBKScerNfJM7BLz5IkqZBHgdBJs74hsRykrvImtGafqiBJ7mJK1H9hHmeI9rPV3KpBipBbsZANeWzNCIL613WmOl07LELkN0kz4CLDuBbFRxALU7jV4kh5aoNkvMtUS6CSROK8YZD`, // Replace with your actual access token
        "Content-Type": "application/json",
      },
      json: true,
    };

    // Send message to each mobile number
    for (let i = 0; i < mobileNumbers.length; i++) {
      const body = {
        messaging_product: "whatsapp",
        to: mobileNumbers[i],
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: schname, // Use the 'schname' variable
                },
                {
                  type: "text",
                  text: bcno, // Use the 'bcno' variable
                },
                {
                  type: "text",
                  text: date, // Use the 'date' variable
                },
              ],
            },
          ],
        },
      };

      options.body = body;

      // Await sending the request within the loop
      await new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if (error) {
            resData.status = false;
            resData.answer = error.message;
            reject(error);
          } else {
            resData.status = true;
            resData.respondData = body;
            resolve(body);
          }
        });
      });
    }

    return res.status(200).json(resData);
  } catch (e) {
    resData.status = false;
    resData.answer = e.message;
    return res.status(500).json(resData);
  }
};

const sendcredited = async (req, res) => {
  const { schname, amount, memname, bcno } = req.body;

  console.log(req.body)
  const resData = {
    status: false,
    answer: "",
  };
  try {
    const templateName = "bc_date";
    const languageCode = "en";
    const findSchemeQuery = `
    SELECT mem_id
    FROM tbl_member
    WHERE mem_name=?`;
    const result1 = await query(findSchemeQuery, [memname]);
    const mem_id = result1[0].mem_id;
    console.log(mem_id);

    const findMobileQuery = `
   SELECT mem_mobile
   FROM tbl_member
   WHERE mem_id=?`;
    const result3 = await query(findMobileQuery, [mem_id]);
    const mobile = result3[0].mem_mobile;


    console.log(mobile)
    const options = {
      method: "POST",
      url: "https://graph.facebook.com/v20.0/306082309265432/messages",
      headers: {
        Authorization: `Bearer EAAGZCJwDqMnwBOzLp1ZCSxw8VURhioObrcOBNugeFv4TzCUfgZB25FHqCspZBhbAzCZC15ZBGhePPgmgQBKScerNfJM7BLz5IkqZBHgdBJs74hsRykrvImtGafqiBJ7mJK1H9hHmeI9rPV3KpBipBbsZANeWzNCIL613WmOl07LELkN0kz4CLDuBbFRxALU7jV4kh5aoNkvMtUS6CSROK8YZD`,
        "Content-Type": "application/json",
      },

     body: {
        messaging_product: "whatsapp",
        to: mobile,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: memname, // Use the 'month' variable
                },
                {
                  type: "text",
                  text: amount, // Use the 'name' variable
                },
                {
                  type: "text",
                  text: schname, // Use the 'name' variable
                },
                {
                  type: "text",
                  text: bcno, // Use the 'name' variable
                },
              ],
            },
          ],
        },
      },
      json: true,
    };

    // Await sending the request within the loop
    await new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          resData.status = false;
          resData.answer = error.message;
          reject(error);
        } else {
          resData.status = true;
          resData.respondData = body;
          resolve(body);
        }
      });
    });

    return res.status(200).json(resData);
  } catch (e) {
    resData.status = false;
    resData.answer = e.message;
    return res.status(500).json(resData);
  }
};


const senddebiated = async (req, res) => {
  const { schname, amount, memname, bcno } = req.body;

  console.log(req.body)
  const resData = {
    status: false,
    answer: "",
  };
  try {
    const templateName = "bc_date";
    const languageCode = "en";
    const findSchemeQuery = `
    SELECT mem_id
    FROM tbl_member
    WHERE mem_name=?`;
    const result1 = await query(findSchemeQuery, [memname]);
    const mem_id = result1[0].mem_id;
    console.log(mem_id);

    const findMobileQuery = `
   SELECT mem_mobile
   FROM tbl_member
   WHERE mem_id=?`;
    const result3 = await query(findMobileQuery, [mem_id]);
    const mobile = result3[0].mem_mobile;


    console.log(mobile)
    const options = {
      method: "POST",
      url: "https://graph.facebook.com/v20.0/306082309265432/messages",
      headers: {
        Authorization: `Bearer EAAGZCJwDqMnwBOzLp1ZCSxw8VURhioObrcOBNugeFv4TzCUfgZB25FHqCspZBhbAzCZC15ZBGhePPgmgQBKScerNfJM7BLz5IkqZBHgdBJs74hsRykrvImtGafqiBJ7mJK1H9hHmeI9rPV3KpBipBbsZANeWzNCIL613WmOl07LELkN0kz4CLDuBbFRxALU7jV4kh5aoNkvMtUS6CSROK8YZD`,
        "Content-Type": "application/json",
      },

     body: {
        messaging_product: "whatsapp",
        to: mobile,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: languageCode,
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: memname, // Use the 'month' variable
                },
                {
                  type: "text",
                  text: amount, // Use the 'name' variable
                },
                {
                  type: "text",
                  text: schname, // Use the 'name' variable
                },
                {
                  type: "text",
                  text: bcno, // Use the 'name' variable
                },
              ],
            },
          ],
        },
      },
      json: true,
    };

    // Await sending the request within the loop
    await new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          resData.status = false;
          resData.answer = error.message;
          reject(error);
        } else {
          resData.status = true;
          resData.respondData = body;
          resolve(body);
        }
      });
    });

    return res.status(200).json(resData);
  } catch (e) {
    resData.status = false;
    resData.answer = e.message;
    return res.status(500).json(resData);
  }
};
module.exports = {
  sendbcDate,
  sendPenddingAmount,
  sendWinner,
  sendMessageWinnerInfo,
  sendcredited,
  senddebiated
};






