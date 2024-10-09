import { estimateBytesUsed as _estimateBytesUsed } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';

// Returns the estimated number of bytes used by the object
export function estimateBytesUsed( object ) {

	// NOTE: This is for backwards compatibility and should be removed later
	const { TextureUtils } = THREE;
	if ( ! TextureUtils ) {

		return 0;

	}

	const dedupeSet = new Set();

	let totalBytes = 0;
	object.traverse( c => {

		// get geometry bytes
		if ( c.geometry && ! dedupeSet.has( c.geometry ) ) {

			totalBytes += _estimateBytesUsed( c.geometry );
			dedupeSet.add( c.geometry );

		}

		// get material bytes
		if ( c.material ) {

			const material = c.material;
			for ( const key in material ) {

				// We support the optional excludeFromTileCache flag for users that want to share textures between
				// tiles and/or manage textures separately.
				const value = material[ key ];
				if ( value && value.isTexture && ! dedupeSet.has( value ) && value.excludeFromTileCache !== true ) {

					const { format, type, image } = value;
					const { width, height } = image;
					const bytes = TextureUtils.getByteLength( width, height, format, type );
					totalBytes += value.generateMipmaps ? bytes * 4 / 3 : bytes;

					dedupeSet.add( value );

				}

			}

		}

	} );

	return totalBytes;

}
