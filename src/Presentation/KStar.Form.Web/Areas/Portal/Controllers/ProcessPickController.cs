using KStar.Form.Mvc.Controllers;
using KStar.Platform.Common;
using KStar.Platform.Infrastructure;
using KStar.Platform.Service;
using KStar.Platform.ViewModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace KStar.Form.Web.Areas.Portal.Controllers
{
    public class ProcessPickController : BaseController
    {
        // GET: WorkFlow/ProcessPick
        IProcessConfigService _processConfigService;
        IUserPickService _userPickService;
        public ProcessPickController(IProcessConfigService processConfigService, IUserPickService userPickService)
        {
            _processConfigService = processConfigService;
            _userPickService = userPickService;
        }
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取流程树数据
        /// </summary>
        /// <param name="dType"></param>
        /// <param name="recordData"></param>
        /// <param name="nodeId"></param>
        /// <param name="searchParam"></param>
        /// <returns></returns>
        public JsonResult GetAllProcessTree(string dType, string recordData, Guid? nodeId, string searchParam = "",bool isProxyProcess=false)
        {
            string NodeType = "Category";
            if (recordData != null)
            {
                JObject nodeData = (JObject)JsonConvert.DeserializeObject(recordData);
                NodeType = nodeData["typeName"].ToString();
            }
            string searchType = "All";
            if (searchParam != null)
            {
                if (dType == "Category") searchType = "Category";
            }
            var data = _userPickService.GetProcessTree(nodeId, NodeType, searchType, searchParam, isProxyProcess,true);
            if (dType != "All" && !dType.Contains("Activity"))
            {
                if (dType.Contains("Version"))
                {
                    data = data.Where(f => f.TypeName != "Activity").ToList();
                    data.ForEach(li =>
                    {
                        if (li.TypeName == "Version") { li.IsLast = true; }
                    });
                }
                else
                    if (dType.Contains("Process"))
                {
                    data = data.Where(f => f.TypeName == "Category" || f.TypeName == "Process").ToList();
                    data.ForEach(li =>
                    {
                        if (li.TypeName == "Process") { li.IsLast = true; }
                    });
                }
                else
                {
                    data = data.Where(f => f.TypeName == "Category").ToList();
                }
            }
            return new KStar.Form.Mvc.Filter.CamelCaseJsonResult(new { code = 200, data = data });
        }
        /// <summary>
        /// 获取所有的流程(未初始化、未同步、常规流程)
        /// </summary>
        /// <param name="dType"></param>
        /// <param name="recordData"></param>
        /// <param name="nodeId"></param>
        /// <param name="searchParam"></param>
        /// <returns></returns>
        public async Task<JsonResult> GetAllWorkflows(string dType, string recordData, Guid? nodeId, string searchParam = "")
        {
            string NodeType = "File";
            if (recordData != null)
            {
                JObject nodeData = (JObject)JsonConvert.DeserializeObject(recordData);
                NodeType = nodeData["typeName"].ToString();
            }
            var res = new List<ConfigProcessTree>();
            if (dType == null) dType = "All";
            if (NodeType == "Process" && nodeId != null)
            {
                //获取版本信息
                res = _processConfigService.GetConfig_ProcessVersionTrees(nodeId ?? Guid.Empty);//processId
            }
            else if (NodeType == "Version" && nodeId != null)
            {
                //获取节点信息
                res = _processConfigService.GetConfig_ActivityTrees(nodeId ?? Guid.Empty)//versionId
                .Where(p => p.ActivityStatus == TreeActivityStatus.User|| p.ActivityStatus == TreeActivityStatus.Append).ToList();
                res.ForEach(li => li.IsLast = true);
            }
            else if (!string.IsNullOrEmpty(searchParam))
            {
                //流程搜索
                res = await ProcessSearch(searchParam, dType);
            }
            else
            {
                //获取所有的流程分类和流程信息
                res = await _processConfigService.GetInitConfigProcessTreesAsync();
                if (dType == "File")
                {
                    res = res.Where(f => f.Type == TreeType.File).ToList();
                }
                if (dType == "Process")
                {
                    res.ForEach(li =>
                    {
                        if (li.Type == TreeType.Process) { li.IsLast = true; }
                    });
                }
            }
            if (dType == "Version")
            {
                res.ForEach(li =>
                {
                    if (li.Type == TreeType.Version) { li.IsLast = true; }
                });
            }
            List<ConfigProcessTreeCheck> data = new List<ConfigProcessTreeCheck>();
            foreach (var item in res)
            {
                var o = new ConfigProcessTreeCheck
                {
                    CheckArr = new TreeCheck { Type = 0, IsCheck = false },
                    Name = item.Name,
                    Type = item.Type,
                    IsLast = item.IsLast,
                    Id = item.Id,
                    Parent_Id = item.Parent_Id
                ,
                    Count = item.Count,
                    ActivityStatus = item.ActivityStatus,
                    CurrentVersion = item.CurrentVersion,
                    ProcessStatus = item.ProcessStatus,
                    Sort = item.Sort
                };
                data.Add(o);
            }
            return new KStar.Form.Mvc.Filter.CamelCaseJsonResult(new { code = 200, data = data });
        }
        private async Task<List<ConfigProcessTree>> BuildProcessTree()
        {
            var list = new List<ConfigProcessTree>();
            list.AddRange(await _processConfigService.GetInitConfigProcessTreesAsync());
            return list;
        }
        private async Task<List<ConfigProcessTree>> ProcessSearch(string param, string type)
        {
            var data = await _processConfigService.GetInitConfigProcessTreesAsync();
            var list = data.Where(p => p.Name.ToLower().Contains(param.ToLower()) && (type == "All" || p.Type == (TreeType)Enum.Parse(typeof(TreeType), type))).ToList();

            var res = list.DepthClone<List<ConfigProcessTree>>();
            void GetParentNode(ConfigProcessTree model)
            {
                if (model.Parent_Id != Guid.Empty)
                {
                    var parentNode = data.FirstOrDefault(p => p.Id == model.Parent_Id);
                    var IsExist = res.Where(p => p.Id == model.Parent_Id).Any();
                    if (parentNode != null && !IsExist)
                    {
                        res.Add(parentNode);
                        GetParentNode(parentNode);
                    }
                }
            }

            list.ForEach(item => GetParentNode(item));

            //数量的处理 TODO。。。。

            return res;
        }
        /*
        /// <summary>
        /// 获取所有的流程(未初始化、未同步、常规流程)
        /// </summary>
        /// <returns></returns>
        public async Task<JsonResult> GetAllWorkflows()
        {
            var process = await _processConfigService.GetInitConfigProcessTreesAsync();
            ExtDataTreeResponse res = new ExtDataTreeResponse();
            List<ExtDataTreeNode> data = new List<ExtDataTreeNode>();
            ExtDataTreeNode d = new ExtDataTreeNode { Id = Guid.Empty.ToString(), Title = "", IsLast = false, children = new List<ExtDataTreeNode>() };
            DataToTree(Guid.Empty, process, ref d);
            res.Status = new DataTreeStatus { Code = 200, Message = "操作成功" };
            res.Data = new List<ExtDataTreeNode>();
            res.Data.AddRange(d.children);
            return new KStar.Web.Filter.CamelCaseJsonResult(res);
        }
        private void DataToTree(Guid parentid, List<ConfigProcessTree> processList, ref ExtDataTreeNode data)
        {
            var children = processList.Where(f => f.Parent_Id == parentid);
            foreach (var item in children)
            {
                ExtDataTreeNode d = new ExtDataTreeNode
                {
                    Id = item.Id.ToString(),
                    Title = item.DisplayName,
                    IsLast = item.Count <= 0 ? true : false,
                    ParentId = data.Id,
                    children = new List<ExtDataTreeNode>(),
                    BasicData = item.Type
                };
                if (item.Count > 0)
                {
                    DataToTree(item.Id, processList, ref d);
                }
                data.children.Add(d);
            }
        }
        public JsonResult GetProcessList(Guid? ProcessID,string ProcessName)
        {
            var res = new List<ConfigProcessTree>();
            if (ProcessID != null)
            {
                res = _processConfigService.GetConfig_ProcessVersionTrees(ProcessID ?? Guid.Empty);
                
                return Json(new { data = res, count = res.Count, code = 0, msg = "获取流程版本数据成功！" }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { data = res, count = 0, code = 200, msg = "请选择流程！" }, JsonRequestBehavior.AllowGet);
            }
        }
    */
    }
}