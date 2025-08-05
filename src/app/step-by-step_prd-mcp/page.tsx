"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  X, 
  ChevronLeft, 
  ChevronRight,
  ChevronUp,
  ChevronDown,
  FileText,
  Folder,
  Settings,
  UserPlus,
  Search,
  Plus,
  Play,
  Code,
  Eye,
  BarChart3,
  Zap,
  Database,
  Workflow,
  HelpCircle,
  Bell,
  Download,
  Copy,
  ExternalLink,
  Upload
} from "lucide-react";

export default function EditorPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("request-1");
  const [activeRequestTab, setActiveRequestTab] = useState("params");
  const [activeResponseTab, setActiveResponseTab] = useState("pretty");
  
  // Sample data for different tabs
  const [tabs, setTabs] = useState([
    { id: "request-1", name: "Request 1", method: "GET", url: "https://api.example.com/users" },
    { id: "request-2", name: "Request 2", method: "POST", url: "https://api.example.com/posts" },
    { id: "request-3", name: "Request 3", method: "PUT", url: "https://api.example.com/update" }
  ]);

  const [tabCounter, setTabCounter] = useState(4); // For generating new tab IDs

  // Sample data for collections and flows
  const collections = [
    { 
      id: "collection-1", 
      name: "Collection 1", 
      expanded: false,
      items: [
        { id: "req-1", name: "Get Users", method: "GET" },
        { id: "req-2", name: "Create User", method: "POST" }
      ]
    },
    { 
      id: "collection-2", 
      name: "Collection 2", 
      expanded: false,
      items: [
        { id: "req-3", name: "Get Posts", method: "GET" },
        { id: "req-4", name: "Update Post", method: "PUT" }
      ]
    }
  ];

  const flows = [
    { 
      id: "flow-1", 
      name: "Flow 1", 
      expanded: false,
      items: [
        { id: "step-1", name: "Step 1", type: "request" },
        { id: "step-2", name: "Step 2", type: "condition" }
      ]
    },
    { 
      id: "flow-2", 
      name: "Flow 2", 
      expanded: false,
      items: [
        { id: "step-3", name: "Step 1", type: "request" },
        { id: "step-4", name: "Step 2", type: "request" }
      ]
    }
  ];

  const [collectionsState, setCollectionsState] = useState(collections);
  const [flowsState, setFlowsState] = useState(flows);

  // Sample data for workspace and environment
  const workspaces = [
    { id: "workspace-1", name: "Workspace 1" },
    { id: "workspace-2", name: "Workspace 2" },
    { id: "workspace-3", name: "Workspace 3" }
  ];

  const environments = [
    { id: "dev", name: "Development" },
    { id: "staging", name: "Staging" },
    { id: "production", name: "Production" }
  ];

  const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
  const [selectedEnvironment, setSelectedEnvironment] = useState(environments[0]);
  const [searchExpanded, setSearchExpanded] = useState(false);

  // Sample data for request tabs
  const [parameters, setParameters] = useState([
    { id: "1", key: "page", value: "1", enabled: true },
    { id: "2", key: "limit", value: "10", enabled: true },
    { id: "3", key: "sort", value: "created_at", enabled: false }
  ]);

  const [headers, setHeaders] = useState([
    { id: "1", key: "Content-Type", value: "application/json", enabled: true },
    { id: "2", key: "Accept", value: "application/json", enabled: true },
    { id: "3", key: "Authorization", value: "Bearer token123", enabled: true }
  ]);

  const [requestBody, setRequestBody] = useState(`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "active": true
}`);

  const [authType, setAuthType] = useState("bearer");
  const [authToken, setAuthToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

  // Sample response data
  const sampleResponse = {
    status: 200,
    statusText: "OK",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "x-ratelimit-remaining": "999"
    },
    body: {
      "success": true,
      "data": {
        "users": [
          {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "role": "admin",
            "created_at": "2024-01-15T10:30:00Z",
            "profile": {
              "avatar": "https://example.com/avatar1.jpg",
              "bio": "Software engineer with 5 years of experience",
              "skills": ["JavaScript", "React", "Node.js"]
            }
          },
          {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "role": "user",
            "created_at": "2024-01-16T14:20:00Z",
            "profile": {
              "avatar": "https://example.com/avatar2.jpg",
              "bio": "UX Designer passionate about user experience",
              "skills": ["Figma", "Sketch", "Adobe XD"]
            }
          }
        ],
        "pagination": {
          "page": 1,
          "limit": 10,
          "total": 2,
          "pages": 1
        }
      },
      "message": "Users retrieved successfully"
    }
  };

  const rawResponse = `HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache
X-RateLimit-Remaining: 999
Content-Length: 847

{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "admin",
        "created_at": "2024-01-15T10:30:00Z",
        "profile": {
          "avatar": "https://example.com/avatar1.jpg",
          "bio": "Software engineer with 5 years of experience",
          "skills": ["JavaScript", "React", "Node.js"]
        }
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "role": "user",
        "created_at": "2024-01-16T14:20:00Z",
        "profile": {
          "avatar": "https://example.com/avatar2.jpg",
          "bio": "UX Designer passionate about user experience",
          "skills": ["Figma", "Sketch", "Adobe XD"]
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 2,
      "pages": 1
    }
  },
  "message": "Users retrieved successfully"
}`;

  const htmlResponse = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .user-card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .user-name { font-weight: bold; color: #333; }
        .user-email { color: #666; }
        .user-role { background: #007bff; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
    </style>
</head>
<body>
    <h1>User Dashboard</h1>
    <div class="user-card">
        <div class="user-name">John Doe</div>
        <div class="user-email">john@example.com</div>
        <span class="user-role">admin</span>
    </div>
    <div class="user-card">
        <div class="user-name">Jane Smith</div>
        <div class="user-email">jane@example.com</div>
        <span class="user-role">user</span>
    </div>
</body>
</html>`;

  // Helper functions for toggling expansion
  const toggleCollection = (collectionId: string) => {
    setCollectionsState(prev => 
      prev.map(collection => 
        collection.id === collectionId 
          ? { ...collection, expanded: !collection.expanded }
          : collection
      )
    );
  };

  const toggleFlow = (flowId: string) => {
    setFlowsState(prev => 
      prev.map(flow => 
        flow.id === flowId 
          ? { ...flow, expanded: !flow.expanded }
          : flow
      )
    );
  };

  // Helper functions for request data management
  const addParameter = () => {
    const newId = (parameters.length + 1).toString();
    setParameters([...parameters, { id: newId, key: "", value: "", enabled: true }]);
  };

  const removeParameter = (id: string) => {
    setParameters(parameters.filter(param => param.id !== id));
  };

  const updateParameter = (id: string, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    setParameters(parameters.map(param => 
      param.id === id ? { ...param, [field]: value } : param
    ));
  };

  const addHeader = () => {
    const newId = (headers.length + 1).toString();
    setHeaders([...headers, { id: newId, key: "", value: "", enabled: true }]);
  };

  const removeHeader = (id: string) => {
    setHeaders(headers.filter(header => header.id !== id));
  };

  const updateHeader = (id: string, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    setHeaders(headers.map(header => 
      header.id === id ? { ...header, [field]: value } : header
    ));
  };

  // Helper functions for tab management
  const addNewTab = () => {
    const newTabId = `request-${tabCounter}`;
    const newTab = {
      id: newTabId,
      name: `Request ${tabCounter}`,
      method: "GET",
      url: "https://api.example.com/new-endpoint"
    };
    
    setTabs(prev => [...prev, newTab]);
    setTabCounter(prev => prev + 1);
    setActiveTab(newTabId); // Auto-select the new tab
  };

  const closeTab = (tabId: string) => {
    // Prevent closing the last tab
    if (tabs.length <= 1) {
      return;
    }

    const tabIndex = tabs.findIndex(tab => tab.id === tabId);
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    
    setTabs(newTabs);
    
    // If we're closing the active tab, switch to another tab
    if (activeTab === tabId) {
      const newActiveTab = tabIndex === 0 ? newTabs[0].id : newTabs[tabIndex - 1].id;
      setActiveTab(newActiveTab);
    }
  };

  // Helper functions for response handling
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['success', 'data', 'users', 'pagination']));
  const [collectionsExpanded, setCollectionsExpanded] = useState(true);
  const [flowsExpanded, setFlowsExpanded] = useState(true);

  const toggleKey = (key: string) => {
    const newExpanded = new Set(expandedKeys);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedKeys(newExpanded);
  };

  const renderJSONValue = (value: unknown, key: string, depth: number = 0) => {
    const isExpanded = expandedKeys.has(key);
    
    if (typeof value === 'object' && value !== null) {
      const isArray = Array.isArray(value);
      const bracketOpen = isArray ? '[' : '{';
      const bracketClose = isArray ? ']' : '}';
      
      return (
        <div className="json-object">
          <div className="json-key-value">
            <span className="json-key text-blue-600">&quot;{key}&quot;:</span>
            <span className="json-bracket text-gray-600">{bracketOpen}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="json-toggle h-4 w-4 p-0 ml-1"
              onClick={() => toggleKey(key)}
            >
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </Button>
          </div>
          {isExpanded && (
            <div className="json-children ml-4">
              {Object.entries(value).map(([childKey, childValue]) => (
                <div key={childKey} className="json-item">
                  {renderJSONValue(childValue, childKey, depth + 1)}
                </div>
              ))}
            </div>
          )}
          <div className="json-bracket text-gray-600">{bracketClose}</div>
        </div>
      );
    } else {
      const valueColor = typeof value === 'string' ? 'text-green-600' : 
                        typeof value === 'number' ? 'text-orange-600' : 
                        typeof value === 'boolean' ? 'text-purple-600' : 'text-gray-600';
      
      return (
        <div className="json-key-value">
          <span className="json-key text-blue-600">&quot;{key}&quot;:</span>
          <span className={`json-value ${valueColor}`}>
            {typeof value === 'string' ? `"${value}"` : String(value)}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Global Header - Fixed, Dark */}
      <header className="global-header fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white border-b border-gray-800">
        <div className="global-header__container flex items-center justify-between px-4 py-3">
          {/* Left Content */}
          <div className="global-header__left-content flex items-center space-x-4">
            <div className="global-header__logo flex items-center space-x-2">
              <div className="global-header__logo-icon flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="global-header__logo-text text-lg font-bold">PRD Editor</span>
            </div>
            <div className="global-header__workspace-selector">
              <Select value={selectedWorkspace.id} onValueChange={(value) => {
                const workspace = workspaces.find(w => w.id === value);
                if (workspace) setSelectedWorkspace(workspace);
              }}>
                <SelectTrigger className="global-header__workspace-trigger bg-gray-800 border-gray-700 text-white w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {workspaces.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>
                      {workspace.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Content */}
          <div className="global-header__right-content flex items-center space-x-4">
            {/* Environment Selector */}
            <div className="global-header__environment-selector">
              <Select value={selectedEnvironment.id} onValueChange={(value) => {
                const environment = environments.find(e => e.id === value);
                if (environment) setSelectedEnvironment(environment);
              }}>
                <SelectTrigger className="global-header__environment-trigger bg-gray-800 border-gray-700 text-white w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {environments.map((environment) => (
                    <SelectItem key={environment.id} value={environment.id}>
                      {environment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Divider */}
            <div className="global-header__divider w-px h-6 bg-gray-600"></div>

            {/* User Avatar (Online Users) */}
            <div className="global-header__online-users flex items-center space-x-2">
              <div className="global-header__user-avatar w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>

            {/* Invite Button */}
            <Button className="global-header__invite-btn">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>

            {/* Divider */}
            <div className="global-header__divider w-px h-6 bg-gray-600"></div>

            {/* Search */}
            <div className="global-header__search flex items-center space-x-2">
              {searchExpanded ? (
                <div className="global-header__search-expanded flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search..." 
                    className="global-header__search-input bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 w-48"
                    autoFocus
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="global-header__search-close text-gray-400 hover:text-white  hover:bg-primary/90"
                    onClick={() => setSearchExpanded(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="global-header__search-toggle text-gray-400 hover:text-white  hover:bg-primary/90"
                  onClick={() => setSearchExpanded(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Help */}
            <Button variant="ghost" size="sm" className="global-header__help-btn text-gray-400 hover:text-white  hover:bg-primary/90">
              <HelpCircle className="h-4 w-4" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="global-header__settings-btn text-gray-400 hover:text-white  hover:bg-primary/90">
              <Settings className="h-4 w-4" />
            </Button>

            {/* Notification */}
            <Button variant="ghost" size="sm" className="global-header__notification-btn text-gray-400 hover:text-white relative  hover:bg-primary/90">
              <Bell className="h-4 w-4" />
              <div className="global-header__notification-badge absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </Button>

            {/* Current User Avatar */}
            <div className="global-header__current-user flex items-center space-x-2">
              <div className="global-header__current-user-avatar w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium">
                ME
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Below Header */}
      <div className="main-content flex-1 flex pt-16 h-full">
        {/* Left Sidebar */}
        <div className={`sidebar ${sidebarCollapsed ? 'sidebar--collapsed w-16' : 'sidebar--expanded w-60'} border-r bg-muted/20 flex flex-col transition-all duration-300`}>
          {/* First Section - 40px height */}
          <div className="sidebar__header h-10 border-b flex items-center justify-between px-3">
            <div className="sidebar__header-search flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className={`sidebar__search-input border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 ${sidebarCollapsed ? 'hidden' : ''}`}
              />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="sidebar__toggle-btn h-6 w-6 p-0"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </Button>
          </div>

          {/* Second Section - Flexible height */}
          <div className="sidebar__content flex-1">
            <ScrollArea className="h-full">
              <div className="sidebar__navigation p-3 space-y-4">
             
                {/* Collections Section */}
                <div className="sidebar__collections-section">
                  <div 
                    className="sidebar__collections-header flex items-center space-x-2 mb-2 cursor-pointer hover:bg-accent rounded-md p-1"
                    onClick={() => setCollectionsExpanded(!collectionsExpanded)}
                  >
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      {collectionsExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </Button>
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className={`sidebar__collections-title text-sm font-medium text-muted-foreground ${sidebarCollapsed ? 'hidden' : ''}`}>Collections</span>
                  </div>
                  {collectionsExpanded && !sidebarCollapsed && (
                    <>
                      <div className="sidebar__collections-actions flex items-center space-x-2 mb-3 pl-4">
                        <Button variant="secondary" size="sm" className="h-7 px-2">
                          <Plus className="h-3 w-3 mr-1" />
                          New
                        </Button>
                        <Button variant="secondary" size="sm" className="h-7 px-2">
                          <Upload className="h-3 w-3 mr-1" />
                          Import
                        </Button>
                      </div>
                      <div className="sidebar__collections-list space-y-1">
                    {collectionsState.map((collection) => (
                      <div key={collection.id} className="sidebar__collection-item pl-4">
                        <div 
                          className="sidebar__collection-header flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => toggleCollection(collection.id)}
                        >
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            {collection.expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </Button>
                          <Folder className="h-4 w-4" />
                          <span className={`sidebar__collection-name text-sm turncate w-full ${sidebarCollapsed ? 'hidden' : ''}`}>{collection.name}</span>
                        </div>
                        {collection.expanded && !sidebarCollapsed && (
                          <div className="sidebar__collection-items ml-6 space-y-1">
                            {collection.items.map((item) => (
                              <div key={item.id} className="sidebar__collection-item-child flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer">
                                <FileText className="h-4 w-4" />
                                <span className="sidebar__item-name text-sm turncate w-full">{item.name}</span>
                                <Badge variant="outline" className="text-xs">{item.method}</Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className={`sidebar__divider border-t border-border ${sidebarCollapsed ? 'hidden' : ''}`}></div>

                {/* Flows Section */}
                <div className="sidebar__flows-section">
                  <div 
                    className="sidebar__flows-header flex items-center space-x-2 mb-2 cursor-pointer hover:bg-accent rounded-md p-1"
                    onClick={() => setFlowsExpanded(!flowsExpanded)}
                  >
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      {flowsExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                    </Button>
                    <Workflow className="h-4 w-4 text-muted-foreground" />
                    <span className={`sidebar__flows-title text-sm font-medium text-muted-foreground ${sidebarCollapsed ? 'hidden' : ''}`}>Flows</span>
                  </div>
                  {flowsExpanded && !sidebarCollapsed && (
                    <>
                      <div className="sidebar__flows-actions flex items-center space-x-2 mb-3 pl-4">
                        <Button variant="secondary" size="sm" className="h-7 px-2">
                          <Plus className="h-3 w-3 mr-1" />
                          New
                        </Button>
                        <Button variant="secondary" size="sm" className="h-7 px-2">
                          <Upload className="h-3 w-3 mr-1" />
                          Import
                        </Button>
                      </div>
                      <div className="sidebar__flows-list space-y-1">
                    {flowsState.map((flow) => (
                      <div key={flow.id} className="sidebar__flow-item pl-4">
                        <div 
                          className="sidebar__flow-header flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => toggleFlow(flow.id)}
                        >
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                            {flow.expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </Button>
                          <Folder className="h-4 w-4" />
                          <span className={`sidebar__flow-name text-sm ${sidebarCollapsed ? 'hidden' : ''}`}>{flow.name}</span>
                        </div>
                        {flow.expanded && !sidebarCollapsed && (
                          <div className="sidebar__flow-items ml-6 space-y-1">
                            {flow.items.map((item) => (
                              <div key={item.id} className="sidebar__flow-item-child flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer">
                                <FileText className="h-4 w-4" />
                                <span className="sidebar__item-name text-sm">{item.name}</span>
                                <Badge variant="outline" className="text-xs">{item.type}</Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Main Work Area */}
        <div className="work-area flex-1 flex flex-col h-full overflow-y-auto">
                      {/* Tab Bar */}
            <div className="work-area__tabs border-b sticky top-0 bg-white z-10 ">
              <div className="work-area__tabs-container flex items-end px-4 pt-2 h-[39px]">
                <div className="work-area__tabs-list flex items-center space-x-1">
                  {tabs.map((tab) => (
                    <div 
                      key={tab.id}
                      className={`work-area__tab flex items-center space-x-2 px-3 py-1 rounded-t-md cursor-pointer h-8 ${
                        activeTab === tab.id 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted hover:bg-accent"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <FileText className="h-3 w-3" />
                      <span className="work-area__tab-text text-sm">{tab.name}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-4 w-4 p-0 ml-1 hover:bg-accent"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent tab selection when clicking close
                          closeTab(tab.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="work-area__new-tab h-6 w-6 p-0 hover:bg-accent"
                    onClick={addNewTab}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

          {/* Tab Content Container */}
          <div className="work-area__tab-content flex-1">
            {tabs.map((tab) => (
              <div 
                key={tab.id}
                className={`work-area__tab-panel ${activeTab === tab.id ? 'block' : 'hidden'}`}
              >
                {/* Request Builder */}
                <div className="work-area__request-builder flex-1 border-b">
                  <div className="work-area__request-builder-container p-4 h-[70vh]">
                    <div className="work-area__request-builder-header flex items-center justify-between mb-4">
                      <h3 className="work-area__request-builder-title text-lg font-semibold">Request Builder - {tab.name}</h3>
                      <Button className="work-area__send-btn">
                        <Play className="h-4 w-4 mr-2" />
                        Send Request
                      </Button>
                    </div>
                    <div className="work-area__request-builder-content space-y-4">
                      {/* HTTP Method and URL */}
                      <div className="work-area__request-line flex items-center space-x-2">
                        <Select defaultValue={tab.method}>
                          <SelectTrigger className="work-area__method-select w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          placeholder="Enter URL..." 
                          className="work-area__url-input flex-1"
                          defaultValue={tab.url}
                        />
                      </div>

                      {/* Request Configuration Tabs */}
                      <Tabs value={activeRequestTab} onValueChange={setActiveRequestTab} className="work-area__request-tabs">
                        <TabsList className="work-area__request-tabs-list">
                          <TabsTrigger value="params">Parameters</TabsTrigger>
                          <TabsTrigger value="headers">Headers</TabsTrigger>
                          <TabsTrigger value="body">Body</TabsTrigger>
                          <TabsTrigger value="auth">Auth</TabsTrigger>
                        </TabsList>
                        <TabsContent value="params" className="work-area__request-tabs-content">
                          <div className="work-area__params-content space-y-4">
                            <div className="work-area__params-header flex items-center justify-between">
                              <h4 className="work-area__params-title text-sm font-medium">Query Parameters</h4>
                              <Button variant="outline" size="sm" onClick={addParameter}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Parameter
                              </Button>
                            </div>
                            <div className="work-area__params-table">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-4">
                                      <Checkbox />
                                    </TableHead>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead className="w-16">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {parameters.map((param) => (
                                    <TableRow key={param.id}>
                                      <TableCell>
                                        <Checkbox 
                                          checked={param.enabled}
                                          onCheckedChange={(checked) => updateParameter(param.id, 'enabled', checked as boolean)}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          value={param.key}
                                          onChange={(e) => updateParameter(param.id, 'key', e.target.value)}
                                          placeholder="Parameter name"
                                          className="border-0 bg-transparent p-0 h-auto"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          value={param.value}
                                          onChange={(e) => updateParameter(param.id, 'value', e.target.value)}
                                          placeholder="Parameter value"
                                          className="border-0 bg-transparent p-0 h-auto"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          onClick={() => removeParameter(param.id)}
                                          className="h-6 w-6 p-0"
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="headers" className="work-area__request-tabs-content">
                          <div className="work-area__headers-content space-y-4">
                            <div className="work-area__headers-header flex items-center justify-between">
                              <h4 className="work-area__headers-title text-sm font-medium">HTTP Headers</h4>
                              <Button variant="outline" size="sm" onClick={addHeader}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Header
                              </Button>
                            </div>
                            <div className="work-area__headers-table">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-4">
                                      <Checkbox />
                                    </TableHead>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead className="w-16">Actions</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {headers.map((header) => (
                                    <TableRow key={header.id}>
                                      <TableCell>
                                        <Checkbox 
                                          checked={header.enabled}
                                          onCheckedChange={(checked) => updateHeader(header.id, 'enabled', checked as boolean)}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          value={header.key}
                                          onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                                          placeholder="Header name"
                                          className="border-0 bg-transparent p-0 h-auto"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          value={header.value}
                                          onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                                          placeholder="Header value"
                                          className="border-0 bg-transparent p-0 h-auto"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Button 
                                          variant="ghost" 
                                          size="sm" 
                                          onClick={() => removeHeader(header.id)}
                                          className="h-6 w-6 p-0"
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="body" className="work-area__request-tabs-content">
                          <div className="work-area__body-content space-y-4">
                            <div className="work-area__body-header flex items-center justify-between">
                              <h4 className="work-area__body-title text-sm font-medium">Request Body</h4>
                              <div className="work-area__body-actions flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  <Code className="h-4 w-4 mr-2" />
                                  Format JSON
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                              </div>
                            </div>
                            <div className="work-area__body-editor">
                              <Textarea 
                                value={requestBody}
                                onChange={(e) => setRequestBody(e.target.value)}
                                placeholder="Enter JSON request body..."
                                className="work-area__body-textarea min-h-[200px] font-mono text-sm"
                              />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="auth" className="work-area__request-tabs-content">
                          <div className="work-area__auth-content space-y-4">
                            <div className="work-area__auth-header">
                              <h4 className="work-area__auth-title text-sm font-medium mb-4">Authentication</h4>
                            </div>
                            <div className="work-area__auth-type-selector">
                              <Label htmlFor="auth-type" className="text-sm font-medium">Type</Label>
                              <Select value={authType} onValueChange={setAuthType}>
                                <SelectTrigger className="w-full mt-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">No Auth</SelectItem>
                                  <SelectItem value="bearer">Bearer Token</SelectItem>
                                  <SelectItem value="basic">Basic Auth</SelectItem>
                                  <SelectItem value="apikey">API Key</SelectItem>
                                  <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {authType === "bearer" && (
                              <div className="work-area__auth-bearer space-y-2">
                                <Label htmlFor="bearer-token" className="text-sm font-medium">Bearer Token</Label>
                                <Input 
                                  id="bearer-token"
                                  value={authToken}
                                  onChange={(e) => setAuthToken(e.target.value)}
                                  placeholder="Enter your bearer token"
                                  type="password"
                                />
                              </div>
                            )}
                            {authType === "basic" && (
                              <div className="work-area__auth-basic space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                                  <Input 
                                    id="username"
                                    placeholder="Enter username"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                  <Input 
                                    id="password"
                                    placeholder="Enter password"
                                    type="password"
                                  />
                                </div>
                              </div>
                            )}
                            {authType === "apikey" && (
                              <div className="work-area__auth-apikey space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="api-key" className="text-sm font-medium">API Key</Label>
                                  <Input 
                                    id="api-key"
                                    placeholder="Enter your API key"
                                    type="password"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="api-key-location" className="text-sm font-medium">Key Location</Label>
                                  <Select defaultValue="header">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="header">Header</SelectItem>
                                      <SelectItem value="query">Query Parameter</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>

                {/* Response Viewer */}
                <div className="work-area__response-viewer flex-1 border-b">
                  <div className="work-area__response-viewer-container p-4">
                    <div className="work-area__response-viewer-header flex items-center justify-between mb-4">
                      <h3 className="work-area__response-viewer-title text-lg font-semibold">Response Viewer - {tab.name}</h3>
                      <div className="work-area__response-actions flex items-center space-x-2">
                        <Badge variant="outline" className="work-area__response-status">200 OK</Badge>
                        <Badge variant="outline" className="work-area__response-time">245ms</Badge>
                      </div>
                    </div>
                    <div className="work-area__response-viewer-content">
                      <Tabs value={activeResponseTab} onValueChange={setActiveResponseTab} className="work-area__response-tabs">
                        <TabsList className="work-area__response-tabs-list">
                          <TabsTrigger value="pretty">Pretty</TabsTrigger>
                          <TabsTrigger value="raw">Raw</TabsTrigger>
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                          <TabsTrigger value="visualize">Visualize</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pretty" className="work-area__response-tabs-content">
                          <div className="work-area__response-pretty space-y-4">
                            <div className="work-area__response-pretty-header flex items-center justify-between">
                              <h4 className="work-area__response-pretty-title text-sm font-medium">Formatted JSON Response</h4>
                              <div className="work-area__response-pretty-actions flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  <Code className="h-4 w-4 mr-2" />
                                  Copy JSON
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="work-area__response-pretty-content bg-gray-50 p-4 rounded-md font-mono text-sm overflow-auto max-h-96">
                              <div className="json-root">
                                {Object.entries(sampleResponse.body).map(([key, value]) => (
                                  <div key={key} className="json-item">
                                    {renderJSONValue(value, key)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="raw" className="work-area__response-tabs-content">
                          <div className="work-area__response-raw space-y-4">
                            <div className="work-area__response-raw-header flex items-center justify-between">
                              <h4 className="work-area__response-raw-title text-sm font-medium">Raw HTTP Response</h4>
                              <div className="work-area__response-raw-actions flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Raw
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </div>
                            <div className="work-area__response-raw-content">
                              <Textarea 
                                value={rawResponse}
                                readOnly
                                className="work-area__response-raw-textarea min-h-[300px] font-mono text-sm bg-gray-50"
                              />
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="preview" className="work-area__response-tabs-content">
                          <div className="work-area__response-preview space-y-4">
                            <div className="work-area__response-preview-header flex items-center justify-between">
                              <h4 className="work-area__response-preview-title text-sm font-medium">Response Preview</h4>
                              <div className="work-area__response-preview-actions flex items-center space-x-2">
                                <Select defaultValue="html">
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="html">HTML</SelectItem>
                                    <SelectItem value="json">JSON</SelectItem>
                                    <SelectItem value="image">Image</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Open in New Tab
                                </Button>
                              </div>
                            </div>
                            <div className="work-area__response-preview-content border rounded-md overflow-hidden">
                              <div className="work-area__response-preview-frame bg-white p-4 min-h-[300px]">
                                <div dangerouslySetInnerHTML={{ __html: htmlResponse }} />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="visualize" className="work-area__response-tabs-content">
                          <div className="work-area__response-visualize space-y-4">
                            <div className="work-area__response-visualize-header flex items-center justify-between">
                              <h4 className="work-area__response-visualize-title text-sm font-medium">Data Visualization</h4>
                              <div className="work-area__response-visualize-actions flex items-center space-x-2">
                                <Select defaultValue="chart">
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="chart">Chart</SelectItem>
                                    <SelectItem value="table">Table</SelectItem>
                                    <SelectItem value="cards">Cards</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm">
                                  <BarChart3 className="h-4 w-4 mr-2" />
                                  Export Chart
                                </Button>
                              </div>
                            </div>
                            <div className="work-area__response-visualize-content">
                              <div className="work-area__response-visualize-chart bg-white p-6 rounded-lg border">
                                <div className="work-area__response-visualize-chart-header mb-4">
                                  <h5 className="text-lg font-semibold">User Data Overview</h5>
                                  <p className="text-sm text-gray-600">Visualization of user data from API response</p>
                                </div>
                                <div className="work-area__response-visualize-chart-content grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="work-area__response-visualize-chart-item">
                                    <h6 className="text-sm font-medium mb-2">User Roles Distribution</h6>
                                    <div className="work-area__response-visualize-chart-bar bg-blue-100 rounded-full h-4 mb-2">
                                      <div className="bg-blue-500 h-4 rounded-full" style={{ width: '50%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-600">
                                      <span>Admin: 1</span>
                                      <span>User: 1</span>
                                    </div>
                                  </div>
                                  <div className="work-area__response-visualize-chart-item">
                                    <h6 className="text-sm font-medium mb-2">Total Users</h6>
                                    <div className="text-3xl font-bold text-blue-600">2</div>
                                    <p className="text-sm text-gray-600">Active users in system</p>
                                  </div>
                                </div>
                                <div className="work-area__response-visualize-chart-table mt-6">
                                  <h6 className="text-sm font-medium mb-3">User Details Table</h6>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Created</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {sampleResponse.body.data.users.map((user) => (
                                        <TableRow key={user.id}>
                                          <TableCell className="font-medium">{user.name}</TableCell>
                                          <TableCell>{user.email}</TableCell>
                                          <TableCell>
                                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                              {user.role}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
} 