Every tileset is represented by its own TileRenderer object

Each frame, before the tileset can be rendered, the TileRenderer.update routine should be called.

The update routine will look at the current camera pose and then walk the tileset hierarchy to determine which tiles should be loaded, and also which tiles should be rendered for the current frame. The tiles that should be loaded are determined by using a target screenspace error


tilesRenderer.setResolution

Sets the screen resolution used to render the tileset. If the current tileset camera resolution does not match the given resolution then it will be updated and a camera-resolution-change event will be dispatched


tilesRenderer.setResolutionFromRenderer

Sets the screen resolution used to render the tileset from the current size of the given renderer