/*:
	@include:
		{
			"work": "work"
		}
	@end-include
*/
addBigNumber = function addBigNumber( numbers, callback ){
	/*:
		@meta-configuration:
			{
				"numbers": "string|number..."
			}
		@end-meta-configuration
	*/
	work( "javac addBigNumber.java && java addBigNumber " + numbers.join( " " ), callback );
};