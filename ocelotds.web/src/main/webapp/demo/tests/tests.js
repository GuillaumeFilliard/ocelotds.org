'use strict';
var nbMsgToBroadcast = 500;
ocelotController.cacheManager.clearCache();
ocelotController.addOpenListener(function () {
   QUnit.module("UnreachableServices");
   QUnit.test(".getVoid()", function (assert) {
      var done = assert.async(), srv = {
         ds: "org.ocelotds.test.UnreachableServices",
         getVoid: function () {
            var op = "getVoid";
            var id = "9aa2b06f2181c16f6ce2480967bd6c9d_" + JSON.stringify([]).md5();
            return OcelotPromiseFactory.createPromise(this.ds, id, op, [], []);
         }
      };
      srv.getVoid().event(function (evt) {
         assert.equal(evt.type, "FAULT", "" + evt.response.classname + " : " + evt.response.message);
         done();
      });
   });
   QUnit.module("CDIRequestBean");
   QUnit.test(".getVoid()", function (assert) {
      var done = assert.async();
      cDIRequestBean.getVoid().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         done();
      });
   });
   QUnit.test(".getString()", function (assert) {
      var done = assert.async();
      cDIRequestBean.getString().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, "FOO");
         done();
      });
   });
   QUnit.test(".getNum()", function (assert) {
      var done = assert.async();
      cDIRequestBean.getNum().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, 1);
         done();
      });
   });
   QUnit.test(".getNumber()", function (assert) {
      var done = assert.async();
      cDIRequestBean.getNumber().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, 2);
         done();
      });
   });
   QUnit.test(".getBool()", function (assert) {
      var done = assert.async();
      cDIRequestBean.getBool().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, true);
         done();
      });
   });
   QUnit.test(".getBoolean()", function (assert) {
      var done = assert.async();
      cDIRequestBean.getBoolean().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, false);
         done();
      });
   });
   QUnit.test(".getDate()", function (assert) {
      var done = assert.async();
      var now = new Date();
      setTimeout(function () {
         cDIRequestBean.getDate().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            assert.ok(new Date(evt.response).getDate() === now.getDate(), "Same day...");
            done();
         });
      }, 50);
   });
   QUnit.test(".getResult()", function (assert) {
      var done = assert.async();
      cDIRequestBean.getResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, {"integer": 5});
         done();
      });
   });
   QUnit.test(".getCollectionInteger()", function (assert) {
      var i, expected = [], done = assert.async();
      for (i = 1; i < 5; i++) {
         expected.push(i);
      }
      cDIRequestBean.getCollectionInteger().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".getCollectionResult()", function (assert) {
      var i, expected = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         expected.push({"integer": 5});
      }
      cDIRequestBean.getCollectionResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".getCollectionOfCollectionResult()", function (assert) {
      var i, j, expected = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         var result = [];
         expected.push(result);
         for (j = 0; j < 4; j++) {
            result.push({"integer": 5});
         }
      }
      cDIRequestBean.getCollectionOfCollectionResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".getMapResult()", function (assert) {
      var i, expected = {}, done = assert.async();
      for (i = 1; i < 5; i++) {
         expected["" + i] = {"integer": 5};
      }
      cDIRequestBean.getMapResult().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithNum(i)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithNum_1";
      cDIRequestBean.methodWithNum(1).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithNumber(i)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithNumber_1";
      cDIRequestBean.methodWithNumber(1).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBool(true)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBool_true";
      cDIRequestBean.methodWithBool(true).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBool(false)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBool_false";
      cDIRequestBean.methodWithBool(false).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBoolean(false)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBoolean_false";
      cDIRequestBean.methodWithBoolean(false).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithBoolean(true)", function (assert) {
      var expected, done = assert.async();
      expected = "methodWithBoolean_true";
      cDIRequestBean.methodWithBoolean(true).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithDate(d)", function (assert) {
      var expected, d, done = assert.async();
      d = new Date();
      expected = "methodWithDate_" + d.getTime();
      cDIRequestBean.methodWithDate(d.getTime()).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithResult(r)", function (assert) {
      var expected, r, done = assert.async();
      r = {"integer": 5};
      expected = "methodWithResult_" + r.integer;
      cDIRequestBean.methodWithResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithArrayInteger(a)", function (assert) {
      var expected, r, done = assert.async();
      r = [1, 2, 3, 4, 5];
      expected = "methodWithArrayInteger_" + r.length;
      cDIRequestBean.methodWithArrayInteger(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithCollectionInteger(c)", function (assert) {
      var expected, r, done = assert.async();
      r = [1, 2, 3, 4, 5];
      expected = "methodWithCollectionInteger_" + r.length;
      cDIRequestBean.methodWithCollectionInteger(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithArrayResult(c)", function (assert) {
      var i, expected, r = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         r.push({"integer": 5});
      }
      expected = "methodWithArrayResult_" + r.length;
      cDIRequestBean.methodWithArrayResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithCollectionResult(c)", function (assert) {
      var i, expected, r = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         r.push({"integer": 5});
      }
      expected = "methodWithCollectionResult_" + r.length;
      cDIRequestBean.methodWithCollectionResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithMapResult(m)", function (assert) {
      var i, expected, r = {}, done = assert.async();
      for (i = 1; i < 5; i++) {
         r["" + i] = {"integer": 5};
      }
      expected = "methodWithMapResult_4";
      cDIRequestBean.methodWithMapResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithCollectionOfCollectionResult(c)", function (assert) {
      var i, j, expected, r = [], done = assert.async();
      for (i = 0; i < 4; i++) {
         var result = [];
         r.push(result);
         for (j = 0; j < 4; j++) {
            result.push({"integer": 5});
         }
      }
      expected = "methodWithCollectionOfCollectionResult_" + r.length;
      cDIRequestBean.methodWithCollectionOfCollectionResult(r).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithManyParameters(a, b, c, d)", function (assert) {
      var a, b, c, d, expected, done = assert.async();
      a = "text", b = 5, c = {"integer": 5}, d = ["a", "b"];
      expected = "methodWithManyParameters a=" + a + " - b=" + b + " - c=" + c.integer + " - d:" + d.length;
      cDIRequestBean.methodWithManyParameters(a, b, c, d).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithAlmostSameSignature(s)", function (assert) {
      var expected, done = assert.async();
      expected = "String";
      cDIRequestBean.methodWithAlmostSameSignature("text").event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodWithAlmostSameSignature(i)", function (assert) {
      var expected, done = assert.async();
      expected = "Integer";
      cDIRequestBean.methodWithAlmostSameSignature(5).event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.deepEqual(evt.response, expected);
         done();
      });
   });
   QUnit.test(".methodThatThrowException()", function (assert) {
      var done = assert.async();
      cDIRequestBean.methodThatThrowException().event(function (evt) {
         assert.equal(evt.type, "FAULT");
         assert.equal(evt.response.classname, "org.ocelotds.tests.MethodException");
         done();
      });
   });
   QUnit.test(".methodCached()", function (assert) {
      var expected, done = assert.async();
      cDIRequestBean.methodCached().event(function (evt) {
         assert.equal(evt.type, "RESULT", "Receive result : " + expected + " from server and put in cache.");
         expected = evt.response.length;
         cDIRequestBean.methodCached().event(function (evt) {
            assert.equal(evt.response.length, expected, "Receive result from cache : " + evt.response.length);
            done();
         });
      });
   });
   QUnit.test(".methodRemoveCache()", function (assert) {
      ocelotController.cacheManager.clearCache();
      var expected, done = assert.async();
      cDIRequestBean.methodCached().event(function (evt) {
         expected = evt.response;
         assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
         cDIRequestBean.methodCached().event(function (evt) {
            assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response));
            cDIRequestBean.methodRemoveCache().event(function (evt) {
               assert.equal(evt.type, "RESULT", "Cache removed.");
               cDIRequestBean.methodCached().event(function (evt) {
                  assert.notEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected));
                  done();
               });
            });
         });
      });
   });
   QUnit.test(".methodRemoveAllCache()", function (assert) {
      ocelotController.cacheManager.clearCache();
      var expected, done = assert.async();
      cDIRequestBean.methodCached().event(function (evt) {
         expected = evt.response;
         assert.equal(evt.type, "RESULT", "Receive result : " + JSON.stringify(expected) + " from server and put in cache.");
         cDIRequestBean.methodCached().event(function (evt) {
            assert.deepEqual(evt.response, expected, "Receive result from cache : " + JSON.stringify(evt.response));
            cDIRequestBean.methodRemoveAllCache().event(function (evt) {
               assert.equal(evt.type, "RESULT", "All Cache removed.");
               cDIRequestBean.methodCached().event(function (evt) {
                  assert.notEqual(evt.response, expected, "Receive result " + JSON.stringify(evt.response) + " from server and previously : "+JSON.stringify(expected));
                  done();
               });
            });
         });
      });
   });
   QUnit.test(".closeAndOpen()", function (assert) {
      var timer, done = assert.async();
      ocelotController.close().then(function(reason) {
         console.info("Websocket closed reason : "+reason)
         cDIRequestBean.getVoid().event(function (evt) {
            assert.equal(evt.type, "FAULT", "WebSocket should be closed : reason : "+reason);
            timer = setTimeout(function () {
               assert.ok(false, "WebSocket doesn't open after re-open");
               done();
            }, 4000);
            ocelotController.open().then(function(){
               cDIRequestBean.getVoid().event(function (evt) {
                  window.clearTimeout(timer);
                  assert.equal(evt.type, "RESULT", "Receive response after re-open");
                  done();
               });
            });
         });
      });
   });
   QUnit.test(".onMessage()", function (assert) {
      var timer, done = assert.async(),
         sub = new Subscriber("mytopic");
      assert.equal(sub.topic, "mytopic", "topic name accessible");
      sub.event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
         cDIRequestBean.publish("mytopic", 1).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call publish method : ok.");
         });
      }).message(function (msg) {
         assert.equal(msg, "Message From server 1", "Receive message in 'mytopic' : ok.");
         sub.unsubscribe().event(function (evt) {
            assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
            window.clearTimeout(timer);
            done();
         });
      });
      timer = setTimeout(function () {
         assert.equal(0, 1, "Receive 0 messages");
         sub.unsubscribe("mytopic").event(function (evt) {
            assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
            done();
         });
      }, 500);
   });
   QUnit.test(".onMessages()", function (assert) {
      var sub, result = 0, expected = nbMsgToBroadcast, timer, done, i, query = location.search, params = query.split("&"), timer;
      var checkResult = function() {
         if(timer) clearTimeout(timer);
         assert.equal(result, expected, "Receive " + result + "/" + expected + " messages");
         sub.unsubscribe().event(function (evt) {
            assert.equal(evt.type, "RESULT", "Unsubscription to 'mytopic' : ok.");
            done();
         });
      };
      for (i = 0; i < params.length; i++) {
         var param = params[i].replace("?", "");
         var keyval = param.split("=");
         if (keyval.length === 2) {
            if (keyval[0] === "nbmsg") {
               expected = parseInt(keyval[1]);
            }
         }
      }
      timer = setTimeout(checkResult, 50 * expected);
      done = assert.async();
      sub = new Subscriber("mytopic").event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
         cDIRequestBean.publish("mytopic", expected).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call publish(" + expected + ") method : ok.");
         });
      }).message(function (msg) {
         result++;
         assert.ok(true, "" + msg + " : (" + result + ")");
         if (result === expected) {
            checkResult();
         }
      });
   });
   QUnit.test(".testGlobalTopic()", function (assert) {
      var sub, timer, topic = "GlobalTopic", expected = "my message", done = assert.async();
      sub = new Subscriber(topic).event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
         cDIRequestBean.sendToGlobalTopic(expected).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call sendToGlobalTopic(" + expected + ") method : ok.");
            sub.message(function (msg) {
               window.clearTimeout(timer);
               assert.equal(msg, expected, "Receive msg in GlobalTopic : " + msg);
               done();
            });
         });
         timer = setTimeout(function () {
            assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
            done();
         }, 200);
      });
   });
   QUnit.test(".testSpecificTopic()", function (assert) {
      var sub, timer, topic = "MyTopic", expected = "my message", done = assert.async();
      sub = new Subscriber(topic).event(function (evt) {
         assert.equal(evt.type, "RESULT", "Subscription to '" + topic + "' : ok.");
         cDIRequestBean.sendToSpecificTopic(expected, topic).event(function (evt) {
            assert.equal(evt.type, "RESULT", "Call sendToSpecificTopic(" + expected + ", " + topic + ")");
            sub.message(function (msg) {
               window.clearTimeout(timer);
               assert.equal(msg, expected, "Receive msg in SpecificTopic(" + topic + ") : " + msg);
               sub.unsubscribe();
               done();
            });
         });
         timer = setTimeout(function () {
            assert.ok(false, "Timeout, didn't receive msg in " + topic + " subscriber.");
            sub.unsubscribe();
            done();
         }, 200);
      });
   });
   QUnit.test(".testGlobalTopicAccess()", function (assert) {
      var sub, done = assert.async();
      cDIRequestBean.setGlobalTopicAccess(false).then(function () {
         new Subscriber("GlobalTopic").event(function (evt) {
            assert.equal(evt.type, "FAULT", "Subscription to 'GlobalTopic' failed : ok.");
            new Subscriber("mytopic").event(function (evt) {
               assert.equal(evt.type, "FAULT", "Subscription to 'mytopic' failed : ok.");
               cDIRequestBean.setGlobalTopicAccess(true);
               sub = new Subscriber("mytopic").event(function (evt) {
                  assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
                  sub.unsubscribe();
                  done();
               });
            });
         });
      });
   });
   QUnit.test(".testSpecificTopicAccess()", function (assert) {
      var sub, done = assert.async();
      cDIRequestBean.setSpecificTopicAccess(false).then(function () {
         new Subscriber("mytopic").event(function (evt) {
            assert.equal(evt.type, "FAULT", "Subscription to 'GlobalTopic' failed : ok.");
            sub = new Subscriber("GlobalTopic").event(function (evt) {
               assert.equal(evt.type, "RESULT", "Subscription to 'mytopic' : ok.");
               cDIRequestBean.setSpecificTopicAccess(true);
               sub.unsubscribe();
               done();
            });
         });
      });
   });
   QUnit.test(".testGetCDIPrincipalName()", function (assert) {
      var login, done = assert.async();
      cDIRequestBean.getCDIPrincipalName().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         login = evt.response;
         assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
         done();
      });
   });
   QUnit.test(".testGetCtxPrincipalName()", function (assert) {
      var login, done = assert.async(), resultCount = 0, okCount = 0, timer = setTimeout(checkResult, 4000);
      var checkResult = function() {
         if(timer) clearTimeout(timer);
         assert.equal(okCount, 50, "50 response with login = "+login);
         done();
      };
      cDIRequestBean.getCtxPrincipalName().event(function (evt) {
         login = evt.response;
         assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
         var getName = function () {
            cDIRequestBean.getCtxPrincipalName().event(function (evt) {
               if (evt.response === login) okCount++;
               resultCount++;
               if (resultCount < 50) getName();
               else checkResult();
            });
         };
         getName();
      });
   });
   QUnit.test(".testIsUserInRoleTrue()", function (assert) {
      var done = assert.async();
      cDIRequestBean.isUserInRole("USERR").event(function (evt) {
         assert.equal(evt.type, "RESULT", "User should be in role : USERR");
         assert.equal(evt.response, true);
         done();
      });
   });
   QUnit.test(".testIsUserInRoleFalse()", function (assert) {
      var done = assert.async();
      cDIRequestBean.isUserInRole("ADMINR").event(function (evt) {
         assert.equal(evt.type, "RESULT");
         assert.equal(evt.response, false);
         done();
      });
   });
   QUnit.test(".callAuthorized()", function (assert) {
      var done = assert.async();
      cDIRequestBean.callAuthorized().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         done();
      });
   });
   QUnit.test(".callUnauthorized()", function (assert) {
      var done = assert.async();
      cDIRequestBean.callUnauthorized().event(function (evt) {
         assert.equal(evt.type, "FAULT");
         done();
      });
   });
   /**
    * CDISessionBEan
    */
   QUnit.module("CDISessionBean");
   QUnit.test(".getValue()", function (assert) {
      var res, done = assert.async();
      cDISessionBean.getValue().event(function (evt) {
         assert.equal(evt.type, "RESULT", "Result : "+evt.response);
         res = evt.response;
         cDISessionBean.getValue().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            assert.equal(res+1, evt.response, "Result is increase each call : "+evt.response);
            cDISessionBean.getValue().event(function (evt) {
               assert.equal(evt.type, "RESULT");
               assert.equal(res+2, evt.response, "Result is increase each call : "+evt.response);
               done();
            });
         });
      });
   });
   QUnit.module("CDISingletonBean");
   QUnit.test(".getValue()", function (assert) {
      var res, done = assert.async();
      cDISingletonBean.getValue().event(function (evt) {
         assert.equal(evt.type, "RESULT", "Result : "+evt.response);
         res = evt.response;
         cDISingletonBean.getValue().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            assert.equal(res+1, evt.response, "Result is increase each call : "+evt.response);
            cDISingletonBean.getValue().event(function (evt) {
               assert.equal(evt.type, "RESULT");
               assert.equal(res+2, evt.response, "Result is increase each call : "+evt.response);
               done();
            });
         });
      });
   });
   QUnit.module("EJBStateless");
   if(eJBStateless != undefined) {
      QUnit.test(".testGetDate() with QOS", function (assert) {
         var r1, r2, done = assert.async(), timer = setTimeout(checkResult, 4000);
         var checkResult = function() {
            if(timer) clearTimeout(timer);
            assert.equal(r1, r2);
            done();
         };
         eJBStateless.getDate().event(function (evt) {
            r1 = evt.response;
            assert.equal(evt.type, "RESULT", "r1 = "+new Date(r1).toString());
            if(r2) checkResult();
         });
         eJBStateless.getDate().event(function (evt) {
            r2 = evt.response;
            assert.equal(evt.type, "RESULT", "r2 = "+new Date(r2).toString());
            if(r1) checkResult();
         });
      });
      QUnit.test(".testGetCDIPrincipalName()", function (assert) {
         var login, done = assert.async(), resultCount = 0, okCount = 0, timer = setTimeout(checkResult, 4000);
         var checkResult = function() {
            if(timer) clearTimeout(timer);
            assert.equal(okCount, 50, "50 response with login = "+login);
            done();
         };
         eJBStateless.getCDIPrincipalName().event(function (evt) {
            login = evt.response;
            assert.notEqual(login, "ANONYMOUS", "login should be different to ANONYMOUS and was "+login);
            var getName = function () {
               eJBStateless.getCDIPrincipalName().event(function (evt) {
                  if (evt.response === login) okCount++;
                  resultCount++;
                  if (resultCount < 50) getName();
                  else checkResult();
               });
            };
            getName();
         });
      });
   }
   QUnit.module("OcelotServices");
   QUnit.test(".setLocale()", function (assert) {
      var done = assert.async(), func;
      func = function (evt) {
         ocelotController.cacheManager.removeEventListener("remove", func);
         ocelotServices.getLocale().event(function (evt) {
            assert.equal(evt.type, "RESULT", "Locale from server "+evt.response);
            ocelotServices.setLocale({"language": "fr", "country": "FR"}).event(function (evt) {
               assert.equal(evt.type, "RESULT");
               if(evt.type === "RESULT") {
                  ocelotServices.getLocale().event(function (evt) {
                     assert.equal(evt.type, "RESULT");
                     if(evt.type === "RESULT") {
                        assert.equal(evt.response.language, "fr", "Language was "+evt.response.language);
                        assert.equal(evt.response.country, "FR", "Country was "+evt.response.country);
                     }
                     done();
                  });
               } else done();
            });
         });
      };
      ocelotController.cacheManager.addEventListener("remove", func);
      ocelotServices.setLocale({"language": "en", "country": "US"}).event(function (evt) {
         assert.equal(evt.type, "RESULT");
      });
   });
   QUnit.module("SpringPrototypeBean");
   QUnit.test(".getCount()", function (assert) {
      var result = 0, nb = 10, num = 0, done = assert.async(), 
      timer = setTimeout(checkResult, 2000),
      checkResult = function() {
         if(timer) clearTimeout(timer);
         assert.equal(result, 0, "Result prototype is stateless, don't store result getCount = "+result);
         done();
      },
      getCount = function() {
         springPrototypeBean.getCount().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            result += evt.response;
            if(num<nb) {
               num++;
               getCount();
            } else checkResult();
         });
      };
      getCount();
   });
   QUnit.test(".getCountFromSingletonAutoWired()", function (assert) {
      var result = 0, nb = 10, num = 0, done = assert.async(), 
      timer = setTimeout(checkResult, 2000),
      expected = ((nb+1) * nb)/2,
      checkResult = function() {
         if(timer) clearTimeout(timer);
         assert.ok(result === expected, "Result singleton is never reset "+result+" == "+expected);
         done();
      },
      getCount = function() {
         springPrototypeBean.getCountFromSingleton().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            result += evt.response;
            if(num<nb) {
               num++;
               getCount();
            } else checkResult();
         });
      };
      springPrototypeBean.initSingleton().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         getCount();
      });
   });
//   QUnit.test(".getPrincipal()", function (assert) {
//      var done = assert.async();
//      springPrototypeBean.getPrincipal().event(function (evt) {
//         assert.equal(evt.type, "RESULT");
//         done();
//      });
//   });
   QUnit.module("SpringSessionBean");
   QUnit.test(".getCount()", function (assert) {
      var result = 0, nb = 10, num = 0, done = assert.async(), 
      timer = setTimeout(checkResult, 2000),
      expected = ((nb+1) * nb)/2,
      checkResult = function() {
         if(timer) clearTimeout(timer);
         assert.ok(result > expected, "Result session is bounded to client : result : "+result+" - expected : "+expected);
         done();
      },
      getCount = function() {
         springSessionBean.getCount().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            result += evt.response;
            if(num<nb) {
               num++;
               getCount();
            } else checkResult();
         });
      };
      springSessionBean.getCount().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         getCount();
      });
   });
   QUnit.module("SpringSingletonBean");
   QUnit.test(".getCount()", function (assert) {
      var result = 0, nb = 10, num = 0, done = assert.async(), 
      timer = setTimeout(checkResult, 2000),
      expected = ((nb+1) * nb)/2,
      checkResult = function() {
         if(timer) clearTimeout(timer);
         assert.ok(result > expected, "Result singleton is never reset "+result+" > "+expected);
         done();
      },
      getCount = function() {
         springSingletonBean.getCount().event(function (evt) {
            assert.equal(evt.type, "RESULT");
            result += evt.response;
            if(num<nb) {
               num++;
               getCount();
            } else checkResult();
         });
      };
      springSingletonBean.getCount().event(function (evt) {
         assert.equal(evt.type, "RESULT");
         getCount();
      });
   });
});
