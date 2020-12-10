$(function () {
    "use strict";
    var options = {
        //默认高度
        DefaultHigh: 0,
        //默认靠左的宽度
        DefaultLeft: 0,
        //  连接线样式
        connectorPaintStyle: {
            strokeWidth: 2,
            stroke: "rgba(211,211,211, 1)",
            joinstyle: "round",
            outlineStroke: "transparent",
            outlineWidth: 2
        },
        passConnectorPaintStyle: {
            strokeWidth: 2,
            stroke: "rgba(138, 201, 37, 1)",
            joinstyle: "round",
            outlineStroke: "transparent",
            outlineWidth: 2
        },
        notPassConnectorPaintStyle: {
            strokeWidth: 2,
            //stroke: "red",
            stroke: "rgba(211,211,211, 1)",
            joinstyle: "round",
            outlineStroke: "transparent",
            outlineWidth: 2
        },
        YpConnectorPaintStyle: {
            strokeWidth: 2,
            //stroke: "red",
            stroke: "rgba(246,203,144, 1)",
            joinstyle: "round",
            outlineStroke: "transparent",
            outlineWidth: 2
        },
        // 鼠标悬浮时的样式
        connectorHoverStyle: {
            strokeWidth: 3,
            stroke: "rgba(30, 83, 39, 1)",
            outlineWidth: 5,
            outlineStroke: "transparent"
        },
        endpointHoverStyle: {
            fill: "transparent",
            stroke: "transparent"
        }
    }

    var endpoint = {
        //这个是源点
        sourceEndpoint: {
            endpoint: "Dot",
            paintStyle: {
                stroke: "transparent",
                fill: "transparent",
                radius: 7,
                strokeWidth: 1
            },
            isSource: true,
            connector: ["Straight"],
            connectorStyle: options.connectorPaintStyle,
            hoverPaintStyle: options.endpointHoverStyle,
            connectorHoverStyle: options.connectorHoverStyle,
            dragOptions: {},
            overlays: [
                ["Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel",
                    visible: false
                }]
            ]
            //maxConnections: 5
        },
        //目标点
        targetEndpoint: {
            endpoint: "Dot",
            paintStyle: {
                fill: "transparent",
                radius: 7
            },
            hoverPaintStyle: options.endpointHoverStyle,
            maxConnections: -1,
            dropOptions: {
                hoverClass: "hover",
                activeClass: "active"
            },
            isTarget: true,
            overlays: [
                ["Label", {
                    location: [0.5, -0.5],
                    label: "Drop",
                    cssClass: "endpointTargetLabel",
                    visible: false
                }]
            ]
        },
        lineMouseover: function (conn, originalEvent) {
            // alert(1);

        },
        lineClick: function (conn, originalEvent) {
            var rule = conn.getData()["LineRule"];
            var oldrule = conn.getData()["oldLineRules"];
            var label = conn.getData()["label"] == null ? "" : conn.getData()["label"].replace(new RegExp("<br>", "gm"), ' ');
            if ((rule != "" && rule != null) || oldrule.length > 0) {
                var msgWindow = $("#detailsLine").html().trim();
                var lactLine = { LineName: conn.getData()["name"], LineRule: rule.replace(new RegExp("“", "gm"), '"').replace(new RegExp("<br>", "gm"), ' '), label: label };
                msgWindow = options.AttrReplace(lactLine, msgWindow);
                var msgWindowElement = $(msgWindow);
                var old = msgWindowElement.find("#overview");
                var oldlen = oldrule.length
                if (oldlen == 0) {
                    old.find("textarea").attr("rows", 6);
                } else {
                    var h = $("#oldLineRule").html().trim();
                    if (oldlen == 1) {
                        h = h.replace("<a id='a_More'>查看更多</a>", "");
                    }
                    $.each(oldrule, function (i, item) {
                        var o = $(h);
                        o.find("label span").html(item.CreateTime);
                        if (i > 0) {
                            o.find("label").html(o.find("label span"));
                            o.css("display", "none");
                            if (i == oldlen - 1)
                                o.find("label").append("<br/><a id='a_Retract'>点击收起</a>");
                        }
                        o.attr("id", "rule_" + i);
                        o.find('textarea').text(item.LineRule.replace(new RegExp("“", "gm"), '"').replace(new RegExp("<br>", "gm"), ' '));
                        old.append(o);
                    });
                };
                old.find("a").on("click", function (e) {
                    var dis = "";
                    if (e.target.id == "a_More") {
                        e.target.setAttribute("style", "display:none");
                    } else {
                        dis = "none";
                        $("#a_More").css("display", "");
                    }
                    for (var a = 1; a < oldlen; a++) {
                        old.find("#rule_" + a).css("display", dis);
                    }
                });
                msgWindowElement.modal('show').on('hidden.bs.modal', function (e) {
                    $(msgWindow).remove();
                    $(".modal").remove();
                });
                //alert(conn.getData()["LineRule"]);

            }
        }, errorClick: function () {
            var errormsgs = this.GetErrorMsgs();
            if (errormsgs != null && errormsgs != "" && errormsgs.ErrorLogs) {
                if (!errormsgs.ErrorLogs.ErrorLog)
                    return;
                var msgWindow = $("#detailsError").html().trim();
                var msgWindowElement = $(msgWindow);
                var itemhtml = $(msgWindow).find("#overview").html().trim();
                if (errormsgs.ErrorLogs.ErrorLog.length > 0) {
                    $.each(errormsgs.ErrorLogs.ErrorLog, function (i, item) {
                        item.Descr = item.Descr.replace(new RegExp("“", "gm"), '"')
                        if (i == 0) {
                            msgWindowElement = $(options.AttrReplace(item, msgWindow));
                        } else {
                            msgWindowElement.find("#overview").append($(options.AttrReplace(item, itemhtml)));
                        }
                    });
                } else {
                    msgWindowElement = $(options.AttrReplace(errormsgs.ErrorLogs.ErrorLog, msgWindow));
                }
                msgWindowElement.modal('show').on('hidden.bs.modal', function (e) {
                    $(msgWindow).remove();
                    $(".modal").remove();
                });
            }
        },
        init: function (connection) {
            //connection.getOverlay("label").setLabel(connection.source.innerText + "-" + connection.target.innerText);
        }
    }

    var fun = {
        addNode: function (parentId, nodeId, nodeLable, size, position, approvers) {
            var panel = $("#" + parentId);
            var ndoe = "Start" == nodeLable ? $("<div class=\"item\"><img src=\"/Images/start.png\"/><span></span></div>")
                : $("<div class=\"item\" ><img src=\"/Images/DefaultActivity.png\"/><img src=\"/Images/error_vf.png\" style=\"display:none;\"/><span></span></div>");
            var title = '';
            if (approvers != null) {
                var len = approvers.length;
                for (var i = 0; i < len; i++) {
                    if (approvers[i].Approvers == null) {
                        var ap = approvers[i].ActivityParticipants;
                        var plen = ap.length;
                        for (var j = 0; j < plen; j++) {
                            title = title + ap[j].EntryName + (plen == (j + 1) ? '' : ';');
                        }
                        title = title + (len == (i + 1) ? '' : '<br/>');
                    } else {
                        title = title + approvers[i].Approvers + (len == (i + 1) ? '' : '<br/>');
                    }
                }
            }
            ndoe.tooltip({
                html: true,
                title: title,
                placement: "right"
            })
            ndoe.width(size.x).height(size.y).css('position', 'absolute').css("background-color", 'rgba(241, 241, 241, 1)').css("padding-top", size.y / 4).
                css('top', position.y).css('left', position.x).attr("id", nodeId).css('z-index', '1');
            ndoe.find("span").text(nodeLable);

            var imgs = ndoe.find("img");
            $.each(imgs, function (i, img) {
                if (i == 0)
                    $(img).height(size.y - 10).width(size.y - 10).css("float", "left").css("position", "relative").css('top', -8);
                else
                    $(img).height(size.y - 30).width(size.y - 30).css("float", "right").css("position", "relative").css('top', -10).css('right', 1);
            });
            // img.height(size.y - 10).width(size.y - 10).css("float", "left").css("position", "relative").css('top', -8);

            panel.append(ndoe);

            return ndoe;
        }, addLabel: function (parentId, labelInst, lineRuleResult) {
            if (labelInst.Label == null || labelInst.Label == "")
                return null;

            var panel = $("#" + parentId);
            var lable = $("<span class=\"label\" yp_display=" + lineRuleResult + ">" + labelInst.Label + "</span>");

            var loc = this.GetPoints(labelInst.Loc + ",0,0");
            //lable.css('font-weight', '500');
            lable.css('position', 'absolute').css('top', loc[0].y + "px").css('left', loc[0].x + "px").css("color", "black").css("z-index", -10);

            panel.append(lable);
            return loc;
        },
        GetPoints: function (strComma) {
            var array = strComma.split(",");
            var list = [];
            for (var i = 0; i < array.length; i += 2) {
                list.push({
                    x: parseFloat(array[i]) + options.DefaultLeft,
                    y: parseFloat(array[i + 1]) + options.DefaultHigh
                });
            }
            return list;
        },

        //获取环节定位
        GetActivityPoints: function (strComma, strOpn) {
            var array = strComma.split(",");
            if (strOpn == "true") {
                array[3] = parseInt(array[3]) - 22;
            } else {
                //  array[3] = parseInt(array[3]);
            }
            var list = [];
            for (var i = 0; i < array.length; i += 2) {
                if (i == 0) {
                    list.push({
                        x: parseFloat(array[i]) + options.DefaultLeft,
                        y: parseFloat(array[i + 1]) + options.DefaultHigh
                    });
                } else {
                    list.push({
                        x: parseFloat(array[i]),
                        y: parseFloat(array[i + 1])
                    });
                }

            }
            return list;
        },
        //计算定位
        ComputeDot: function (point, act) {
            var coordinates = act.Loc + "," + act.Size;
            var strOpn = act.StrOpn;
            var points = this.GetActivityPoints(coordinates, strOpn);

            return [(point.x - points[0].x) / points[1].x, (point.y - points[0].y) / points[1].y, 0, 0];
        },

        //是否走过该环节
        PassActivity: function (viewProcess, activityName) {

            if (!this.IsProcessInstance()) {
                return null;
            }

            var activtiy = null;
            var act2 = null;
            $.each(viewProcess.ViewProcess.ActInsts.ActInst, function (i, act) {
                if (act.ActName == activityName && (act.Status == "4" || act.Status == "2" || act.Status == "6")) {
                    activtiy = activtiy == null ? act : parseInt(activtiy.ActInstID) > parseInt(act.ActInstID) ? activtiy : act;
                }
            });
            if (act2 != null)
                activtiy = act2;
            return activtiy;
        },

        PassLine: function (viewProcess, lienName) {
            if (!this.IsProcessInstance()) {
                return null;
            }
            var lineInst = null;
            $.each(viewProcess.ViewProcess.LineInsts.LineInst, function (i, line) {

                if (line.LineName == lienName) {
                    lineInst = lineInst == null ? line : parseInt(lineInst.LineInstID) > parseInt(line.LineInstID) ? lineInst : line;
                    //return false;
                }
            });
            return lineInst;
        },
        FindFromLine: function (viewProcess, actName) {
            var lineInst = null;
            $.each(viewProcess.ViewProcess.Process.Lines.Line, function (i, line) {
                if (line.Start == actName) {
                    lineInst = line;
                    return false;
                }
            });
            return lineInst;
        },
        FindAct: function (name) {
            var act = null;
            var acts = this.GetActs();
            $.each(acts, function (i, item) {
                if (!options.IsProcessInstance()) {
                    if (item.ID == name || item.Name == name) {
                        act = item;
                        return false;
                    }
                } else {
                    if (item.Name == name) {
                        act = item;
                        return false;
                    }
                }

            });

            return act;
        },
        FindEventError: function (name) {
            var Event = null;
            var Events = this.GetActsEvent();
            if (Events == null || Events == undefined)
                return null;
            $.each(Events, function (i, item) {
                if (item.ActName == name && item.Status == "4") {
                    Event = item;
                    return false;
                }
            });
            return Event;
        },
        FindApprovers: function (name) {
            var act = [];
            var acts = this.GetApprovers();
            if (acts != null) {
                $.each(acts, function (i, item) {
                    if (!options.IsProcessInstance()) {
                        if (item.ActivityId == name || item.ActivityName == name) {
                            act.push(item);

                        }
                    } else {
                        if (item.ActivityName == name) {
                            act.push(item);

                        }
                    }

                });
            }

            return act.length > 0 ? act : null;
        },
        FindLineRules: function (name) {
            var rules = { LineRuleResult: false, LineRule: null };
            var acts = this.GetLineRules();
            if (acts != null) {
                $.each(acts, function (i, item) {
                    if (item.LineName == name) {
                        rules = item;
                        return false;
                    }
                });
            }
            return rules;
        },
        FindOldLineRules: function (name) {
            var rules = [];
            var acts = this.GetOldLineRules();
            if (acts != undefined) {
                acts = acts.oldLineRules.Lines;
                $.each(acts, function (i, item) {
                    if (item.LineName == name) {
                        rules.push(item);
                    }
                });
            }
            return rules;
        },

        StatusDesc: function (value) {

            if (value == 1) {
                return "Waiting";
            }

            if (value == 2) {
                return "Active";
            }
            if (value == 3) {
                return "Expired";
            }
            if (value == 4) {
                return "Completed";
            }
            if (value == 6) {
                return "Error";
            }
        },

        AttrReplace: function (actInst, html) {

            $.each(actInst, function (attr, value) {

                var re = new RegExp("\\[" + attr + "\\]", "g");
                if (attr == "Status") {
                    html = html.replace(re, options.StatusDesc(value));
                } else {
                    html = html.replace(re, value);
                }
            });

            return html;

        },
        IsProcessInstance: function () {

            if (ViewProcess.ViewProcess.ProcessInstance == undefined) {

                return false;

            } else {

                return true;
            }
        },

        GetActs: function () {
            return ViewProcess.ViewProcess.Process.Acts.Act;
        },
        GetActsEvent: function () {
            return ViewProcess.ViewProcess.EventInsts.EventInst;
        },
        GetApprovers: function () {
            return ViewProcess.ViewProcess.Process.Approvers;
        },
        GetErrorMsgs: function () {
            return ViewProcess.ViewProcess.Process.ErrorMsgs;
        },
        GetLineRules: function () {
            return ViewProcess.ViewProcess.Process.LineRules;
        },
        GetOldLineRules: function () {
            return ViewProcess.ViewProcess.Process.oldLineRules;
        },

        GetRect: function (act) {

            return act.Loc + "," + act.Size;

        },
        GetLines: function () {
            return ViewProcess.ViewProcess.Process.Lines.Line;
        },
    };

    var eventFun = {

        //流程预判页面选择事件
        PrognosisEvent: function (actMsgWindowElement, act, tabTarget) {
            return;
            //if (options.IsProcessInstance()) {
            var _processID = options.IsProcessInstance() ? ViewProcess.ViewProcess.ProcessInstance.ProcInstID : 0;
            //ViewProcess.ViewProcess.deleteProcessInstance.ProcInstID; 
            var participants = actMsgWindowElement.find("#participants");
            var participant_tbody = participants.find("tbody");
            CommonUtil.Loading();

            var callBack = function (resultList) {
                CommonUtil.Loaded();
                tabTarget.data("request", true);
                if (resultList == null) {
                    tabTarget.tab('show');
                    return;
                }
                //var A_mouse = "";
                $.each(resultList, function (index, participant) {
                    var tr = "<tr><td>" + participant.User + "</td>" +
                        "<td>" + participant.Status + "</td></tr>";
                    participant_tbody.append($(tr));
                    // A_mouse += participant.User + ";";
                });
                //$("#" + act.Name).data("A_mouse", A_mouse);
                //$("#" + act.Name).data("Is_first", false);
                tabTarget.tab('show')
            };

            $.post("/Home/GetActivityParticipants", {
                ProcessID: _processID,
                Act: act.Name,
                ProcessFullName: ViewProcess.ViewProcess.Process.Folder + "\\\\" + ViewProcess.ViewProcess.Process.Name
            }, function (data, textStatus, jqXHR) {
                var result = JSON.parse(data);
                if (result == null) {
                    callBack(null);
                    return;
                }
                var resultList = [];
                if (result.Participants.Participant.length > 0) {
                    resultList = result.Participants.Participant;
                } else {
                    // resultList.push(result.Participants.Participant);
                }
                callBack(resultList);

            }, "json");
            // }
        },
        //获取环节处理人（已经执行的和已经处理的）
        ParticipantsEvent: function (actMsgWindowElement, actInst, approver, tabTarget) {

            var participants = actMsgWindowElement.find("#participants");
            var participant_tbody = participants.find("tbody");
            if (actInst != null) {
                CommonUtil.Loading();
                $.post("/Home/GetActivityInstanceParticipants", {
                    ProcessID: ViewProcess.ViewProcess.ProcessInstance.ProcInstID,
                    ActInstID: actInst.ActInstID
                }, function (data, textStatus, jqXHR) {
                    CommonUtil.Loaded();
                    tabTarget.data("request", true);
                    var result = JSON.parse(data);
                    if (result == null) {
                        tabTarget.tab('show');
                        return;
                    }
                    var resultList = [];
                    if (result.Participants.Participant.length > 0) {
                        resultList = result.Participants.Participant;
                    } else {
                        resultList.push(result.Participants.Participant);
                    }

                    $.each(resultList, function (index, participant) {
                        var tr = "<tr><td>" + participant.User + "</td>" +
                            "<td>" + participant.StartDate + "</td>" +
                            "<td>" + participant.FinishDate + "</td>" +
                            "<td>" + participant.Status + "</td>" +
                            "<td>" + participant.Action + "</td></tr>";
                        participant_tbody.append($(tr));
                    });
                    tabTarget.tab('show')
                }, "json");
            }
            else {
                tabTarget.data("request", true);
                if (approver != null) {
                    var alen = approver.length;
                    for (var i = 0; i < alen; i++) {
                        var _approvers = '';
                        if (approver[i].Approvers == null) {
                            var ap = approver[i].ActivityParticipants;
                            var plen = ap.length;;
                            for (var j = 0; j < plen; j++) {
                                _approvers = _approvers + ap[j].EntryName + (plen == (j + 1) ? '' : ',');
                            }
                        } else {
                            _approvers = approver[i].Approvers;
                        }

                        var tr = "<tr><td>" + _approvers + "</td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td>未开始</td>" +
                            "<td></td></tr>";
                        if (_approvers != "")
                            participant_tbody.append($(tr));
                    };
                }
                tabTarget.tab('show');
            }
        }
    };
    $.extend(options, endpoint);
    $.extend(options, fun);
    $.extend(options, eventFun);

    var CommonUtil = {
        //加载中
        Loading: function () {
            if ($(".modal-backdrop.onloading").length == 0) {
                $("<div class=\"modal-backdrop fade in onloading\"/>").appendTo("body")
            }
        },
        //加载完毕
        Loaded: function () {
            $(".modal-backdrop.onloading").remove();
        }
    };

    //默认高度
    var DefaultHigh = 0;

    //  连接线样式
    var connectorPaintStyle = {
        strokeWidth: 2,
        stroke: "rgba(30, 83, 39, 1)",
        joinstyle: "round",
        outlineStroke: "transparent",
        outlineWidth: 2
    },
        passConnectorPaintStyle = {
            strokeWidth: 2,
            stroke: "rgba(138, 201, 37, 1)",
            joinstyle: "round",
            outlineStroke: "transparent",
            outlineWidth: 2
        },
        notPassConnectorPaintStyle = {
            strokeWidth: 2,
            stroke: "red",
            joinstyle: "round",
            outlineStroke: "transparent",
            outlineWidth: 2
        },
        // 鼠标悬浮时的样式
        connectorHoverStyle = {
            strokeWidth: 3,
            stroke: "rgba(30, 83, 39, 1)",
            outlineWidth: 5,
            outlineStroke: "transparent"
        },
        endpointHoverStyle = {
            fill: "transparent",
            stroke: "transparent"
        },
        //这个是源点
        sourceEndpoint = {
            endpoint: "Dot",
            paintStyle: {
                stroke: "transparent",
                fill: "transparent",
                radius: 7,
                strokeWidth: 1
            },
            isSource: true,
            connector: ["Straight"],
            connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                ["Label", {
                    location: [0.5, 1.5],
                    label: "Drag",
                    cssClass: "endpointSourceLabel",
                    visible: false
                }]
            ]
            //maxConnections: 5
        },
        //目标点
        targetEndpoint = {
            endpoint: "Dot",
            paintStyle: {
                fill: "transparent",
                radius: 7
            },
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: -1,
            dropOptions: {
                hoverClass: "hover",
                activeClass: "active"
            },
            isTarget: true,
            overlays: [
                ["Label", {
                    location: [0.5, -0.5],
                    label: "Drop",
                    cssClass: "endpointTargetLabel",
                    visible: false
                }]
            ]
        },
        init = function (connection) {
            //connection.getOverlay("label").setLabel(connection.source.innerText + "-" + connection.target.innerText);
        };

    var addNode = function (parentId, nodeId, nodeLable, size, position) {
        var panel = $("#" + parentId);

        var ndoe = "Start" == nodeLable ? $("<div class=\"item\"><img src=\"/Images/start.png\"/><span></span></div>") : $("<div class=\"item\"><img src=\"/Images/DefaultActivity.png\"/><span></span></div>");

        ndoe.width(size.x).height(size.y).css('position', 'absolute').css("background-color", 'rgba(241, 241, 241, 1)').css("padding-top", size.y / 4).
            css('top', position.y).css('left', position.x).attr("id", nodeId);
        ndoe.find("span").text(nodeLable);

        var img = ndoe.find("img");

        img.height(size.y - 10).width(size.y - 10).css("float", "left").css("position", "relative").css('top', -8);

        panel.append(ndoe);

        return ndoe;
    };

    var addLabel = function (parentId, labelInst) {
        if (labelInst.Label == null || labelInst.Label == "") {
            return null;
        }
        else {
            //if (labelInst.Label) {
            //    labelInst.Label = jsResx[labelInst.Label];
            //}
        }
        var panel = $("#" + parentId);
        var lable = $("<span class=\"label\">" + labelInst.Label + "</span>");

        var loc = GetPoints(labelInst.Loc + ",0,0");

        lable.css('position', 'absolute').css('top', loc[0].y + "px").css('left', loc[0].x + "px").css("color", "black").css("z-index", 1);

        panel.append(lable);
        return loc;
    };

    var GetPoints = function (strComma) {
        var array = strComma.split(",");
        var list = [];
        for (var i = 0; i < array.length; i += 2) {
            list.push({
                x: parseFloat(array[i]),
                y: parseFloat(array[i + 1]) + DefaultHigh
            });
        }
        return list;
    };

    //获取环节定位
    var GetActivityPoints = function (strComma, strOpn) {
        var array = strComma.split(",");
        if (strOpn == "true") {
            array[3] = parseInt(array[3]) - 22;
        } else {
            //array[3] = parseInt(array[3]) - 8;
        }
        var list = [];
        for (var i = 0; i < array.length; i += 2) {
            if (i == 0) {
                list.push({
                    x: parseFloat(array[i]),
                    y: parseFloat(array[i + 1]) + DefaultHigh
                });
            } else {
                list.push({
                    x: parseFloat(array[i]),
                    y: parseFloat(array[i + 1])
                });
            }

        }
        return list;
    };

    //计算定位
    var ComputeDot = function (point, act) {
        var coordinates = act.Loc + "," + act.Size;
        var strOpn = act.StrOpn;
        var points = GetActivityPoints(coordinates, strOpn);

        return [(point.x - points[0].x) / points[1].x, (point.y - points[0].y) / points[1].y, 0, 0];
    };

    //是否走过该环节
    var PassActivity = function (viewProcess, activityName) {
        var activtiy = null;
        var j = 0;
        $.each(viewProcess.ViewProcess.ActInsts.ActInst, function (i, act) {
            if (act.ActName == activityName) {
                if ((act.Status == "4" || act.Status == "2" || act.Status == "6")) {
                    var actinstId = Number(act.ActInstID);
                    if (isNaN(actinstId)) {
                        activtiy = act;
                    }
                    else {
                        if (j < Number(act.ActInstID)) {
                            j = Number(act.ActInstID);
                            activtiy = act;
                        }
                    }

                }
            }
        });
        return activtiy;
    };
    //检查Event状态
    //GroupName	StatusID	Status
    //Event	0	Empty
    //Event	1	Active
    //Event	2	Expired
    //Event	3	Completed
    //Event	4	Error
    var PassEvent = function (viewProcess, activity) {
        var status;
        if (activity.Evt) {
            if (activity.Evt.length) {
                for (var i = 0; i < activity.Evt.length; i++) {
                    var evt = activity.Evt[i];
                    for (var j = 0; j < viewProcess.ViewProcess.EventInsts.EventInst.length; j++) {
                        var event = viewProcess.ViewProcess.EventInsts.EventInst[j];
                        if (event.ActName == activity.Name && event.EventName == evt.Name) {
                            if (event.Status == "4") {
                                status = event.Status;
                                break;
                            }
                        }
                    }
                }
            }
            else {
                if (viewProcess.ViewProcess.EventInsts.EventInst.length) {
                    for (var j = 0; j < viewProcess.ViewProcess.EventInsts.EventInst.length; j++) {
                        var event = viewProcess.ViewProcess.EventInsts.EventInst[j];
                        if (event.ActName == activity.Name && event.EventName == activity.Evt.Name) {
                            if (event.Status == "4") {
                                status = event.Status;
                                break;
                            }
                        }
                    }
                }
                else {
                    var event = viewProcess.ViewProcess.EventInsts.EventInst;
                    if (event.ActName == activity.Name && event.EventName == activity.Evt.Name) {
                        if (event.Status == "4") {
                            status = event.Status;
                        }
                    }
                }
            }
        }
        if (status == "4") {
            return 6;
        }
        return undefined;
    };
    var PassLine = function (viewProcess, lienName) {
        var lineInst = null;
        if (viewProcess.ViewProcess.LineInsts.LineInst.length) {
            $.each(viewProcess.ViewProcess.LineInsts.LineInst, function (i, line) {

                if (line.LineName == lienName) {
                    lineInst = line;
                    return false;
                }
            });
        }
        else {
            var line = viewProcess.ViewProcess.LineInsts.LineInst;
            if (line.LineName == lienName) {
                lineInst = line;
            }
        }
        return lineInst;
    };

    var FindAct = function (name) {
        var act = null;
        $.each(ViewProcess.ViewProcess.Process.Acts.Act, function (i, item) {
            if (item.Name == name) {
                act = item;
                return false;
            }
        });
        return act;
    };

    var StatusDesc = function (value) {

        if (value == 1) {
            return "Waiting";
        }

        if (value == 2) {
            return "Active";
        }
        if (value == 3) {
            return "Expired";
        }
        if (value == 4) {
            return "Completed";
        }
        if (value == 6) {
            return "Error";
        }
    };

    var AttrReplace = function (actInst, html) {

        $.each(actInst, function (attr, value) {

            var re = new RegExp("\\[" + attr + "\\]", "g");
            if (attr == "Status") {
                html = html.replace(re, StatusDesc(value));
            } else {
                html = html.replace(re, value);
            }
        });

        return html;

    };

    var CommonUtil = {
        //加载中
        Loading: function () {
            if ($(".modal-backdrop.onloading").length == 0) {
                $("<div class=\"modal-backdrop fade in onloading\"/>").appendTo("body")
            }
        },
        //加载完毕
        Loaded: function () {
            $(".modal-backdrop.onloading").remove();
        }
    };


    var JsonEscape = function (jsonString) {

        return jsonString.replace(/\\/g, '//')
    };

    var ViewProcess = JSON.parse(JsonEscape(jsonString));

    var init = function () {
        var title = "";
        var info;
        if (!ViewProcess.Error) {
            title = " ViewFlow - " + ViewProcess.ViewProcess.Process.Name + "(" + ViewProcess.ViewProcess.ProcessInstance.Folio + ")";
            $("title").text(ViewProcess.ViewProcess.ProcessInstance.Folio);
            $(".flowTitle").text(title);
            try {
                var startAct = FindAct("Start");
                var coordinates = startAct.Loc + "," + startAct.Size; //环节点位
                var strOpn = startAct.StrOpn;
                var points = GetActivityPoints(coordinates, strOpn);
                if (points[0].y <= 32) {
                    DefaultHigh = 32;
                } else {
                    DefaultHigh = 42 - points[0].y;
                }
            } catch (ex) {
                throw ex;
            }
        } else {
            if (ViewProcess.ViewProcess.Process.Folder == "KStar") {
                title = "流程异常，请联系管理员修复流程。";
                ViewProcess.Info = ViewProcess.Error;
                $("title").text(title);
                if (ViewProcess.Info) {
                    info = "</br><a style='margin-left: 60px;' href='#' onclick=\"alert('" + ViewProcess.Info + "')\">点击查看更多信息</a>";
                }
                $(".flowTitle").text(title).css("color", "red");
                $(".flowTitle").append(info);
            }
            else {
                title = ViewProcess.Error;
                $("title").text(title);
                if (ViewProcess.Info) {
                    info = "</br><a style='margin-left: 60px;' href='#' onclick=\"alert('" + ViewProcess.Info + "')\">点击查看更多信息</a>";
                }
                $(".flowTitle").text(title).css("color", "red");
                $(".flowTitle").append(info);
            }
        }
    };

    init();

    jsPlumb.ready(function () {

        var rootDiv = "demo";
        var instance = window.jsp = jsPlumb.getInstance({
            // default drag options
            DragOptions: {
                cursor: 'pointer',
                zIndex: 2000
            },
            // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
            // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
            ConnectionOverlays: [
                ["Arrow", {
                    location: 1,
                    visible: true,
                    width: 1,
                    length: 11,
                    id: "ARROW",
                    events: {
                        click: function () { }
                    }
                }],
                ["Label", {
                    location: 0.1,
                    id: "label",
                    cssClass: "aLabel",
                    events: {
                        tap: function () { }
                    }
                }]
            ],
            Container: rootDiv
        });

        var basicType = {
            connector: "Flowchart",
            paintStyle: {
                stroke: "red",
                strokeWidth: 4
            },
            hoverPaintStyle: {
                stroke: "blue"
            },
            overlays: [
                "Arrow"
            ]
        };

        instance.registerConnectionType("basic", basicType);

        //环节定位
        $.each(ViewProcess.ViewProcess.Process.Acts.Act, function (i, item) {
            var coordinates = item.Loc + "," + item.Size; //环节点位
            var strOpn = item.StrOpn;
            var points = GetActivityPoints(coordinates, strOpn);
            var name = item.Name;
            if (name == "Start") {
                points[1].y = points[1].y + 8;
            }

            var node = addNode(rootDiv, name, item.Name, points[1], points[0]);

            var activity = PassActivity(ViewProcess, name);

            if (name != "Start") {
                var status = PassEvent(ViewProcess, item);
                if (status) {
                    activity.Status = status;
                }
            }
            if (activity != null) {
                if (activity.Status == 2) {
                    node.css("background-color", 'rgba(196, 216, 235, 1)'); //当前环节颜色

                } else if (activity.Status == 6) { //错误样式
                    node.css("background-color", 'rgba(196, 216, 235, 1)'); //当前环节颜色
                    node.css("border", '2px solid red');
                    node.append('<img src="/images/error_vf.png" style="height: 16px; width: 16px; float: right; position: relative; top: -12px;">');
                } else {
                    node.css("background-color", 'rgba(213, 238, 175, 1)'); //执行完毕的颜色 
                }
            }
            //存储该实例信息到其实节点
            $(node).data("ActInst", activity);

            $(node).data("Act", item);

        });

        //线定位与label 定位
        $.each(ViewProcess.ViewProcess.Process.Lines.Line, function (i, item) {
            var lineRule = options.FindLineRules(item.Name);
            var oldlineRule = options.FindOldLineRules(item.Name);
            var source = item.Start || item.StartID; //起始环节
            var end = item.End || item.FinishID; //结束环节
            var sourceAct = options.FindAct(source); //起始环节 act 实例
            var endAct = options.FindAct(end); //结束环节 act 实例
            var anchor = item.Anchor;
            var sourceUUID = item.Name + source; //起始节点GUID 
            var endUUID = item.Name + end; //结束节点GUID 
            var _Label = item.Label; //标签 
            var endnode = $("#" + endAct.Name.replace(/\//, '\\\/').replace(/\s/g, "-").replace("(", "\\(").replace(")", "\\)").replace("&", "-"));
            var startnode = $("#" + sourceAct.Name.replace(/\//, '\\\/').replace(/\s/g, "-").replace("(", "\\(").replace(")", "\\)").replace("&", "-"));

            var points = [];
            if (anchor.Coords == null || anchor.Coords == undefined) {

                var lineStartCoords = item.LineStart + "," + item.ActivityStartLoc + "," + item.ActivityStartSize;
                var lineEndCoords = item.LineEnd + "," + item.ActivityEndLoc + "," + item.ActivityEndSize;

                var lineStartPoint = options.GetPoints(lineStartCoords);
                var lineEndPoint = options.GetPoints(lineEndCoords);

                var computeLinePoint = function (_linePoints, _direction) {

                    if (_linePoints[0].x == 0) {
                        _linePoints[0].x = _linePoints[1].x;
                        _linePoints[0].y = _linePoints[1].y + _linePoints[0].y;

                    } else {
                        _linePoints[0].x = _linePoints[1].x + _linePoints[0].x
                        _linePoints[0].y = _linePoints[1].y;
                    }

                    if (_direction == "Down") {
                        _linePoints[0].y = _linePoints[0].y + _linePoints[2].y;

                    } else if (_direction == "Up") {
                        _linePoints[0].y = _linePoints[0].y;
                    } else if (_direction == "Left") {
                        _linePoints[0].x = _linePoints[0].x;

                    } else if (_direction == "Right") {
                        _linePoints[0].x = _linePoints[0].x + _linePoints[2].x;
                    }
                };

                computeLinePoint(lineStartPoint, item.Anchor.Start);
                computeLinePoint(lineEndPoint, item.Anchor.End);
                points.push(lineStartPoint[0]);
                points.push(lineEndPoint[0]);

            } else {
                var coordinates = anchor.Coords.replace(/\+/g, ",");
                var array = coordinates.split(",");
                var strComma = array.join(",");
                points = options.GetPoints(strComma);
            }

            var sourceAnchors = options.ComputeDot(points[0], sourceAct);

            var endAnchors = options.ComputeDot(points[points.length - 1], endAct);
            var lineInst = options.PassLine(ViewProcess, item.Name);

            var _sourceEndpoint = JSON.parse(JSON.stringify(options.sourceEndpoint));
            if (anchor.Coords == null || anchor.Coords == undefined) {
                _sourceEndpoint.connector[0] = "Flowchart"
            }


            var nodeStatus = endnode.attr("yp_display");
            if (nodeStatus != "true") {    //预判节点状态
                endnode.attr("yp_display", lineRule.LineRuleResult);
            }
            if (lineInst != null) {
                if (lineInst.Result == 2) {
                    _sourceEndpoint.connectorStyle = options.notPassConnectorPaintStyle;
                } else {
                    _sourceEndpoint.connectorStyle = options.passConnectorPaintStyle;
                    endnode.data("toRule", true);
                    startnode.data("fromRule", true);
                }
            } else {
                //结束节点状态
                //var activity = options.PassActivity(ViewProcess, endAct.Name);
                //if (lineRule.LineRuleResult && activity==null) {
                //    _sourceEndpoint.connectorStyle = options.YpConnectorPaintStyle;
                //    //未执行过 或者开始节点    显示预判颜色
                //    if (node.css("background-color").indexOf('213, 238, 175') < 0 || sourceAct.Name == "Start") {
                //        node.css("background-color", 'rgba(246, 203, 144, 1)'); //预判节点颜色
                //    }
                //}
            }
            options.addLabel(rootDiv, _Label, lineRule.LineRuleResult);

            instance.addEndpoint(source, {
                anchor: sourceAnchors,
                uuid: sourceUUID
            }, _sourceEndpoint);

            if (points.length > 2) {
                $.each(points, function (i, point) {

                    if (i != 0 && i != points.length - 1) {
                        var _sourceAnchors = options.ComputeDot(point, sourceAct);
                        instance.addEndpoint(source, {
                            anchor: _sourceAnchors,
                            uuid: sourceUUID + i
                        }, options.targetEndpoint);
                        instance.addEndpoint(source, {
                            anchor: _sourceAnchors,
                            uuid: i + sourceUUID + i
                        }, _sourceEndpoint);
                    }
                });
            }
            instance.addEndpoint(end, {
                anchor: endAnchors,
                uuid: endUUID
            }, options.targetEndpoint);

            if (points.length == 2) {
                instance.connect({
                    uuids: [sourceUUID, endUUID],
                    editable: false,
                    overlays: [
                        ["Arrow", {
                            location: 1,
                            visible: true,
                            width: 11,
                            length: 11,
                            id: "arrow2"
                        }
                        ]
                    ],
                    data: { name: item.Name, LineRule: lineRule.LineRule, LineRuleResult: lineRule.LineRuleResult, label: _Label.Label == null ? "" : _Label.Label, oldLineRules: oldlineRule }
                });
            } else {
                $.each(points, function (i, point) {

                    if (i == 0) {
                        instance.connect({
                            uuids: [sourceUUID, sourceUUID + 1],
                            editable: false,
                            data: { name: item.Name, LineRule: lineRule.LineRule, LineRuleResult: lineRule.LineRuleResult, label: _Label.Label == null ? "" : _Label.Label, oldLineRules: oldlineRule }
                        });
                    } else if (i > 0 && i < points.length - 2) {
                        instance.connect({
                            uuids: [i + sourceUUID + i, sourceUUID + (i + 1)],
                            editable: false,
                            data: { name: item.Name, LineRule: lineRule.LineRule, LineRuleResult: lineRule.LineRuleResult, label: _Label.Label == null ? "" : _Label.Label, oldLineRules: oldlineRule }
                        });
                    } else if (i == points.length - 2) {
                        instance.connect({
                            uuids: [i + sourceUUID + i, endUUID],
                            editable: false,
                            overlays: [
                                ["Arrow", {
                                    location: 1,
                                    visible: true,
                                    width: 11,
                                    length: 11,
                                    id: "arrow2"
                                }]
                            ],
                            data: { name: item.Name, LineRule: lineRule.LineRule, LineRuleResult: lineRule.LineRuleResult, label: _Label.Label == null ? "" : _Label.Label, oldLineRules: oldlineRule }
                        });
                    }
                });
            }
        });

        instance.bind("connection", function (connInfo, originalEvent) {
            init(connInfo.connection);
        });

        jsPlumb.fire('jsPlumbdemoLoaded', instance);


        $("#" + rootDiv).delegate(".item", "click", function (e) {
            var target = e.currentTarget;
            var actInst = $(target).data("ActInst");
            var act = $(target).data("Act");

            if (actInst == null) {
                var actMsgWindow = $("#prognosisTemplate").html().trim();
                actMsgWindow = AttrReplace(act, actMsgWindow);
                var actMsgWindowElement = $(actMsgWindow);

                actMsgWindowElement.modal('show').on('hidden.bs.modal', function (e) {
                    $(actMsgWindow).remove();
                    $(".modal").remove();
                });

                actMsgWindowElement.find(".modal-body li a").on('show.bs.tab', function (e) {
                    var tab = $(e.target);
                    var tabAria = tab.attr("aria-controls");
                    if (tabAria == "Overview") {
                        return true;
                    }
                    if (tab.data("request") == true) {
                        return true;
                    }
                    if (tabAria == "Participants") {
                        tab.data("request", true);
                        var participants = actMsgWindowElement.find("#participants");
                        var participant_tbody = participants.find("tbody");

                        CommonUtil.Loading();
                        $.post("/ViewFlow/GetActivityParticipants", {
                            FormId: ViewProcess.ViewProcess.ProcessInstance.FormId,
                            ActName: act.Name
                        }, function (data) {
                            CommonUtil.Loaded();
                            tab.data("request", true);
                            if (data.length == 0) {
                                tab.tab('show');
                                return;
                            }
                            $.each(data, function (index, participant) {
                                var tr = "<tr><td>" + participant.UserDisplayName + "</td><td>" + participant.StatusName + "</td></tr>";
                                participant_tbody.append($(tr));
                            });
                            tab.tab('show');
                        });
                    }
                    return false;
                });

                return;
            }

            //活动中的、已执行的点击事件
            var msgWindow = $("#detailsTemplate").html().trim();

            msgWindow = AttrReplace(actInst, msgWindow);


            var msgWindowElement = $(msgWindow);

            msgWindowElement.modal('show').on('hidden.bs.modal', function (e) {
                $(msgWindow).remove();
                $(".modal").remove();
            });


            msgWindowElement.find(".modal-body li a").on('show.bs.tab', function (e) {
                var tab = $(e.target);
                var tabAria = tab.attr("aria-controls");
                if (tabAria == "Overview") {
                    return true;
                }
                if (tab.data("request") == true) {
                    return true;
                }
                if (tabAria == "Participants") {
                    tab.data("request", true);
                    var participants = msgWindowElement.find("#participants");
                    var participant_tbody = participants.find("tbody");

                    CommonUtil.Loading();
                    $.post("/ViewFlow/GetActivityInstanceParticipants", {
                        FormId: ViewProcess.ViewProcess.ProcessInstance.FormId,
                        ActName: act.Name,
                        ActStatus: actInst.Status
                    }, function (data) {
                        CommonUtil.Loaded();
                        tab.data("request", true);
                        if (data.length == 0) {
                            tab.tab('show');
                            return;
                        }
                        $.each(data, function (index, participant) {
                            var tr = "<tr><td>" + participant.UserDisplayName + "</td><td>" + participant.StartDate + "</td>" +
                                "<td>" + participant.EndDate + "</td><td>" + participant.StatusName + "</td>" +
                                "<td>" + participant.ActionName + "</td></tr>";
                            participant_tbody.append($(tr));
                        });
                        tab.tab('show');
                    });
                }

                if (tabAria == "Activity Data") {

                    var activityDatas = msgWindowElement.find("#activityData");
                    var activityData_tbody = activityDatas.find("tbody");
                    CommonUtil.Loading();
                    $.post("/ViewFlow/GetActivityInstanceData", {
                        ProcessID: ViewProcess.ViewProcess.ProcessInstance.ProcInstID,
                        ActInstID: actInst.ActInstID
                    }, function (data, textStatus, jqXHR) {
                        CommonUtil.Loaded();
                        tab.data("request", true);
                        if (!data) {
                            tab.tab('show');
                            return;
                        }
                        var result = JSON.parse(data);
                        if (result.ActivityInstanceData.DataFields == null) {
                            tab.tab('show');
                            return;
                        }
                        $.each(result.ActivityInstanceData.DataFields.DataField, function (index, field) {
                            var tr = "<tr><td>" + field.Name + "</td>" +
                                "<td>" + field.Value + "</td>";
                            if (field.AuditValues) {
                                tr += "<td>" + field.AuditValues.Value.DateChanged + "</td>" +
                                    "<td>" + field.AuditValues.Value.ChangedBy + "</td></tr>";
                            }
                            else {
                                tr += "<td></td><td></td></tr>";
                            }
                            activityData_tbody.append($(tr));
                        });

                        tab.tab('show')
                    }, "json");
                }
                return false;
            });
        });

    });

});