/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.chat;

/**
 *
 * @author hhfrancois
 */
public class ChatterInconsistentException extends Exception {

	private static final long serialVersionUID = -2965043982714074565L;

	/**
	 * Constructs an instance of <code>ChatterAlreadyExistException</code> with the specified detail message.
	 *
	 * @param msg the detail message.
	 */
	public ChatterInconsistentException(String msg) {
		super(msg);
	}
}
