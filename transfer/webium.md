Enable

```
--enable-features="InitialWebUI,WebUIReloadButton:WebUIReloadButtonDeferBrowserViewShow/true,SkipIPCChannelPausingForNonGuests,WebUIInProcessResourceLoadingV2,InitialWebUISyncNavStartToCommit"
```

Trace

```
--trace-startup --trace-categories="toplevel,browser,renderer,cc,navigation,ipc,disabled-by-default-devtools.timeline,input,ui,viz,views,disabled-by-default-toplevel.flow,toplevel.ipc,net,network,loading,mojom,blink,content,io,mojom.flow,scheduler,startup,waap" --trace-startup-duration=10 --trace-startup-file=/tmp/webui_trace.json
```
