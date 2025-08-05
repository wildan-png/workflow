"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Navigation } from "@/components/navigation";
import { 
  Globe, 
  Folder, 
  FileText, 
  Settings, 
  ChevronDown, 
  Plus,
  Send,
  BarChart3,
  CheckCircle,
  Clock,
  HardDrive,
  Zap,
  Workflow,
  Layers,
  Download,
  Trash2,
  Copy
} from "lucide-react";

export default function WorkspacePage() {
  const [activeEnvironment, setActiveEnvironment] = useState("Development");
  const [httpMethod, setHttpMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/users");
  const [activeTab, setActiveTab] = useState("params");
  const [responseTab, setResponseTab] = useState("pretty");

  const environments = [
    { name: "Development", url: "https://dev-api.example.com" },
    { name: "Staging", url: "https://staging-api.example.com" },
    { name: "Production", url: "https://api.example.com" },
  ];

  const collections = [
    {
      name: "User Management",
      requests: [
        { name: "Get Users", method: "GET", path: "/users" },
        { name: "Create User", method: "POST", path: "/users" },
        { name: "Update User", method: "PUT", path: "/users/{id}" },
        { name: "Delete User", method: "DELETE", path: "/users/{id}" },
      ]
    },
    {
      name: "Authentication",
      requests: [
        { name: "Login", method: "POST", path: "/auth/login" },
        { name: "Logout", method: "POST", path: "/auth/logout" },
        { name: "Refresh Token", method: "POST", path: "/auth/refresh" },
      ]
    }
  ];

  const flows = [
    { name: "User Registration Flow", description: "Complete user signup process" },
    { name: "Payment Processing", description: "Handle payment transactions" },
    { name: "Data Export", description: "Export user data workflow" },
  ];

  const sampleParams = [
    { key: "page", value: "1", description: "Page number" },
    { key: "limit", value: "10", description: "Items per page" },
    { key: "sort", value: "created_at", description: "Sort field" },
  ];

  const sampleHeaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Authorization", value: "Bearer {{token}}" },
    { key: "Accept", value: "application/json" },
  ];

  const sampleResponse = {
    status: 200,
    time: "245ms",
    size: "2.3KB",
    data: {
      users: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ],
      total: 2,
      page: 1,
      limit: 10
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation Bar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">API Workspace</span>
            </div>
            <Navigation />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Environment Switcher */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {activeEnvironment}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Environments</h4>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {environments.map((env) => (
                      <div
                        key={env.name}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
                          activeEnvironment === env.name ? "bg-accent" : "hover:bg-muted"
                        }`}
                        onClick={() => setActiveEnvironment(env.name)}
                      >
                        <div>
                          <div className="font-medium">{env.name}</div>
                          <div className="text-sm text-muted-foreground">{env.url}</div>
                        </div>
                        {activeEnvironment === env.name && (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button size="sm" variant="ghost">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collections Sidebar */}
        <div className="w-80 border-r bg-muted/20 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Collections</h3>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Collections */}
              {collections.map((collection, index) => (
                <Collapsible key={index} defaultOpen>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                      <div className="flex items-center space-x-2">
                        <Folder className="h-4 w-4" />
                        <span className="font-medium">{collection.name}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 space-y-1">
                    {collection.requests.map((request, reqIndex) => (
                      <div
                        key={reqIndex}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                      >
                        <Badge variant="outline" className="text-xs">
                          {request.method}
                        </Badge>
                        <FileText className="h-3 w-3" />
                        <span className="text-sm">{request.name}</span>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}
              
              <Separator />
              
              {/* Flows */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Workflow className="h-4 w-4" />
                  <span className="font-medium">Flows</span>
                </div>
                <div className="space-y-1">
                  {flows.map((flow, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
                    >
                      <Layers className="h-3 w-3" />
                      <div>
                        <div className="text-sm font-medium">{flow.name}</div>
                        <div className="text-xs text-muted-foreground">{flow.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Request Editor */}
          <div className="border-b p-4">
            <div className="flex items-center space-x-2">
              <Select value={httpMethod} onValueChange={setHttpMethod}>
                <SelectTrigger className="w-24">
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
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter request URL"
                className="flex-1"
              />
              
              <Button className="gap-2">
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </div>

          {/* Config and Response Area */}
          <div className="flex-1 flex">
            {/* Config Tabs */}
            <div className="w-1/2 border-r">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="params">Params</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="body">Body</TabsTrigger>
                  <TabsTrigger value="tests">Tests</TabsTrigger>
                </TabsList>
                
                <TabsContent value="params" className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Query Parameters</h4>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Key</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleParams.map((param, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Input defaultValue={param.key} className="h-8" />
                            </TableCell>
                            <TableCell>
                              <Input defaultValue={param.value} className="h-8" />
                            </TableCell>
                            <TableCell>
                              <Input defaultValue={param.description} className="h-8" />
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="headers" className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Request Headers</h4>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Key</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleHeaders.map((header, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Input defaultValue={header.key} className="h-8" />
                            </TableCell>
                            <TableCell>
                              <Input defaultValue={header.value} className="h-8" />
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="body" className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Request Body</h4>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue="json">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="form">Form</SelectItem>
                            <SelectItem value="raw">Raw</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Enter request body..."
                      className="min-h-[200px] font-mono text-sm"
                      defaultValue={`{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}`}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="tests" className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Test Scripts</h4>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Enter test scripts..."
                      className="min-h-[200px] font-mono text-sm"
                      defaultValue={`// Test script example
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 200ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});`}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Response Pane */}
            <div className="w-1/2 flex flex-col">
              <Tabs value={responseTab} onValueChange={setResponseTab} className="h-full flex flex-col">
                {/* Response Meta Bar */}
                <div className="border-b p-3 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {sampleResponse.status}
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{sampleResponse.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <HardDrive className="h-3 w-3" />
                        <span>{sampleResponse.size}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="pretty">Pretty</TabsTrigger>
                  <TabsTrigger value="raw">Raw</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="visualize">Visualize</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pretty" className="flex-1 p-4">
                  <ScrollArea className="h-full">
                    <pre className="text-sm font-mono bg-muted/20 p-4 rounded-md">
{JSON.stringify(sampleResponse.data, null, 2)}
                    </pre>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="raw" className="flex-1 p-4">
                  <ScrollArea className="h-full">
                    <pre className="text-sm font-mono bg-muted/20 p-4 rounded-md">
{JSON.stringify(sampleResponse.data)}
                    </pre>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="preview" className="flex-1 p-4">
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Users List</CardTitle>
                        <CardDescription>Total: {sampleResponse.data.total} users</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {sampleResponse.data.users.map((user, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                              <Badge variant="outline">ID: {user.id}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="visualize" className="flex-1 p-4">
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Visualization charts will appear here</p>
                      <p className="text-sm">Charts, graphs, and data visualizations</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 